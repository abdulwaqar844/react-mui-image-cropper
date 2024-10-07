import 'react-image-crop/dist/ReactCrop.css';



import {
  Card,
  Grid,
  CardHeader,
  CardContent,
} from '@mui/material';


import SmallLogo from './SmallLogoUploader';
import MainLogo from './MainLogoUploader';
import BGIMGUploader from './IMGUploader';


export default function DiamondClientCreateForm() {
  // const [crop, setCrop] = useState();
  // const [mainLogo, setMainLogo] = useState(null);

  // const [smallLogo, setSmallLogo] = useState(null);
  // const [backgroundImage, setBackgroundImage] = useState(null);


  return (
    <Grid container spacing={3}>
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
            <BGIMGUploader />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
