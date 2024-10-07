import Iconify from 'src/components/iconify';
import ImageCropper from './ImageCropper';
import { Stack, Dialog, Button, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const Modal = ({ updateAvatar, onClose, open ,imgSrc}) => {
  return (
    <Dialog fullWidth sx={{minHeight:300}} maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>
        Upload background Image
      </DialogTitle>

      <ImageCropper updateAvatar={updateAvatar} onClose={onClose} imgSrc={imgSrc}/>

      {/* <Stack display='flex' alignItems='center'>
       
      </Stack> */}
    </Dialog>
  );
};
export default Modal;
