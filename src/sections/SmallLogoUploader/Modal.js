import { Dialog, DialogTitle } from '@mui/material';
// eslint-disable-next-line import/no-named-as-default
import ImageCropper from './ImageCropper';

// eslint-disable-next-line react/prop-types
const Modal = ({ updateAvatar, onClose, open, imgSrc }) => (
  <Dialog fullWidth sx={{ minHeight: 300 }} maxWidth="xs" open={open} onClose={onClose}>
    <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>Upload Small Logo</DialogTitle>
    <ImageCropper updateAvatar={updateAvatar} onClose={onClose} imgSrc={imgSrc} />
  </Dialog>
);

export default Modal;
