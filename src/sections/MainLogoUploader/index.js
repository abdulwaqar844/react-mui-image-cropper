/* eslint-disable react/jsx-no-bind */
import { useRef, useState } from 'react';
import { Box, Stack } from '@mui/material';
import { UploadIllustration } from '../../assets/illustrations';
import Modal from './Modal';

const UploadLogo = () => {

  const avatarUrl = useRef('');
  const [modalOpen, setModalOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState('');

  function base64ToBlob(base64Data, contentType) {
    // Check if the string contains the data URL prefix and strip it
    const base64String = base64Data.split(',')[1]; // Removes 'data:image/png;base64,'

    try {
      const byteCharacters = atob(base64String);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      return new Blob(byteArrays, { type: contentType });
    } catch (e) {
      console.error('Invalid base64 string:', e);
      return null;
    }
  }

  const updateAvatar = (imgSRC) => {
    // const blob = base64ToBlob(imgSRC, 'image/png');
    // Convert to File if needed:
    // let file;
    // if (blob) {
    //   file = new File([blob], `smallLogo_image_${Math.floor(Date.now() / 1000)}.png`, {
    //     type: 'image/png',
    //   });
    // }
    avatarUrl.current = imgSRC;
  };
  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        () => setImgSrc(reader.result?.toString() || ''),
        setModalOpen(true)
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  return (
    <>
      <Stack display="flex" direction="column" alignItems="center" pt={3}>
        <Stack className="relative">
          {avatarUrl.current ? (
            <img src={avatarUrl.current} alt="Avatar" height={300}/>
          ) : (
            <Stack >
              <UploadIllustration sx={{ width: 220 }} />
            </Stack>
          )}

          {/* <Button
            variant="contained"
            sx={{
              bottom: -12,
            }}
            variant="contained"
            startIcon={<Iconify icon="mingcute:pencil-fill" />}
            title="Change photo"
            onClick={() => setModalOpen(true)}
          >
            Upload Small Logo
          </Button> */}
          <Box
            component="input"
            type="file"
            onChange={onSelectFile}
            // eslint-disable-next-line no-return-assign
            onClick={(event) =>     event.target.value = ''}

            sx={{
              display: 'block', // matches `block`
              width: '100%', // matches `w-full`
              fontSize: '0.875rem', // matches `text-sm`
              py: 2,

              // Styles for the file input's "button" part
              '&::file-selector-button': {
                marginRight: '1rem', // matches `file:mr-4`
                paddingY: '0.25rem', // matches `file:py-1` (1 * 4px)
                paddingX: '0.5rem', // matches `file:px-2` (2 * 4px)
                borderRadius: '10px', // matches `file:rounded-full`
                border: 0, // matches `file:border-0`
                fontSize: '18px', // matches `file:text-xs`
                color: 'red',
                // backgroundColor: '#4e6dff', // matches `file:bg-gray-700`
                transition: 'background-color 0.3s',
                py: 1,
                '&:hover': {
                  backgroundColor: 'grey.600', // matches `hover:file:bg-gray-600`
                },
              },
            }}
          />
        </Stack>
      </Stack>
      <Modal
        imgSrc={imgSrc}
        updateAvatar={updateAvatar}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default UploadLogo;
