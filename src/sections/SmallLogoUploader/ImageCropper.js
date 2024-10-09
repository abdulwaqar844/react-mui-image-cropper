import React, { useState, useRef } from 'react';

import ReactCrop, {
  centerCrop,
  makeAspectCrop,
} from 'react-image-crop';
import { Box, Button, Slider, Stack, Typography } from '@mui/material';

import { canvasPreview } from './canvasPreview';
import { useDebounceEffect } from './useDebounceEffect';

import Iconify from '../../components/Iconify';

const ASPECT_RATIO = 1;
function centerAspectCrop(mediaWidth,  mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}
const ImageCropper = ({ onClose, updateAvatar, imgSrc }) => {
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const blobUrlRef = useRef('');
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(1);
  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  async function onDownloadCropClick() {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error('Crop canvas does not exist');
    }
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );
    const ctx = offscreen.getContext('2d');
    if (!ctx) {
      throw new Error('No 2d context');
    }
  // Set the background color to white
  ctx.fillStyle = 'white'; // Set background color to white
  ctx.fillRect(0, 0, offscreen.width, offscreen.height); // Fill the canvas
    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    );
    const blob = await new Promise((resolve) => {
      offscreen.convertToBlob({
        type: 'image/png',
      }).then(resolve);
    });

    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }
    blobUrlRef.current = URL.createObjectURL(blob);
    // let file;
    // if (blob) {
    //   file = new File([blob], `smallLogo_image_${Math.floor(Date.now() / 1000)}.png`, {
    //     type: 'image/png',
    //   });
    // }
   }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, scale, rotate);
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  return (
    <Stack px={3}>
      {/* {error && <p className="text-red-400 text-xs">{error}</p>} */}
      {imgSrc && (
        <Stack display="flex" flexDirection="column" alignItems="center">
          <Stack>
            <Box sx={{ width: 320 }}>
              <Box sx={{ m: 3 }} />
              <Typography gutterBottom>Scale</Typography>
              <Slider
                valueLabelDisplay="auto"
                onChange={(e, value) => {
                  setScale(Number(value));
                }}
                step={0.1}
                min={0}
                max={5}
                aria-label="custom thumb label"
                defaultValue={1}
              />
            </Box>{' '}
          </Stack>
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={ASPECT_RATIO}
            minWidth={400}
            minHeight={100}
            circularCrop
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              // style={{ maxHeight: '100vh' }}
              style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <Stack direction="row" spacing={3} alignItems="center" justifyContent="center" py={2}>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                const dataUrl = previewCanvasRef.current.toDataURL();
                updateAvatar(dataUrl);
                onDownloadCropClick();
                onClose();
              }}
            >
              Crop Image
            </Button>
            <Button
              type="button"
              variant="contained"
              color="error"
              onClick={onClose}
              startIcon={<Iconify icon="eva:close-outline" />}
            >
              Close
            </Button>
          </Stack>
        </Stack>
      )}

      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: 'none',
            border: '1px solid black',
            objectFit: 'contain',
            width: 150,
            height: 150,
          }}
        />
      )}
    </Stack>
  );
};
export default ImageCropper;
