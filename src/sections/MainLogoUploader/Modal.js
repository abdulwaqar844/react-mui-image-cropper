import { Dialog, DialogTitle } from '@mui/material';
import ImageCropper from './ImageCropper';

const Modal = ({ updateAvatar, onClose, open, imgSrc }) => {
  return (
    <Dialog fullWidth sx={{ minHeight: 300 }} maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>Upload Main Logo</DialogTitle>
      <ImageCropper updateAvatar={updateAvatar} onClose={onClose} imgSrc={imgSrc} />
    </Dialog>
  );
};
export default Modal;
