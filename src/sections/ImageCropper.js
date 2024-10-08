import 'react-image-crop/dist/ReactCrop.css';

import { Card, Grid, CardHeader, CardContent, Typography } from '@mui/material';

import SmallLogo from './SmallLogoUploader';
import MainLogo from './MainLogoUploader';
import IMGUploader from './IMGUploader';

export default function ImageCropper() {
  return (
    <Grid container spacing={3} pb={6} px={8}>
      <Grid item xs={12}>
        <Typography pb={4} textAlign="center" variant="h4" pt={6}>
          Image Cropper
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Card>
          <CardHeader title="Small Logo" />
          <CardContent>
            <SmallLogo />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Card>
          <CardHeader title="Main Logo" />
          <CardContent>
            <MainLogo />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} mt={3}>
        <Card>
          <CardHeader title="Background Image" />
          <CardContent>
            <IMGUploader />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
