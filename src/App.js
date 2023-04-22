
import { useState } from 'react';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ResponsiveAppBar from './components/ResponsiveAppBar'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { styled } from '@mui/material/styles';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Typography from '@mui/material/Typography';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
// import LoadingButton from '@mui/lab/LoadingButton';

const axios = require('axios').default;


const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));
function App() {

  const [videoURL, setVideoURL] = useState('');
  const [videoDetails, setVideoDetails] = useState({});
  var videoData;
  const [loading, setLoading] = useState(false);
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  function getVideoURL(e) {
    setVideoURL(e.target.value);
    setLoading(false)
  }
  function fetchVideoDetails() {
    axios.post('https://givefastlink.com/wp-json/aio-dl/video-data/', {
      url: videoURL
    }).then(function (response) {
      console.log(response.data);
      videoData = response.data;
      console.log(videoData)
      // const obj = response.data.medias;

      // const sorted = Object.keys(obj)
      //   .sort()
      //   .reduce((accumulator, key) => {
      //     accumulator[key] = obj[key];

      //     return accumulator;
      //   }, {});

      // console.log(sorted);

      setVideoDetails(response.data);
      // console.log(response.data);
      // filterDownloadableDetails(response.data);



    }).catch(function (error) {
      console.log(error);
    }).finally(() => {
      setLoading(true);
    });
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <ResponsiveAppBar />
      <Container maxWidth="lg">
        <Box elevation={3} margin="auto" padding={5} boxShadow={2}>
          <h1>YouTube Video Downloader</h1>

          <Stack direction="row" spacing={1}>

            <TextField fullWidth id="outlined-basic" size="small" label="YouTube Video Link" variant="outlined" onChange={getVideoURL} />
            <Button onClick={fetchVideoDetails} variant="contained" color="success" size='small' endIcon={<DownloadIcon />} style={{ borderRadius: '13px', paddingLeft: '20px', paddingRight: '20px' }}>
              Download
            </Button>
            <Button onClick={() => { console.log(videoDetails) }}>OK</Button>
            
          </Stack>
          {loading ? <Box sx={{ flexGrow: 1, marginTop: "10px" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardMedia
                    component="img"
                    image={videoDetails.thumbnail}
                  // alt={props.data.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {/* {props.data.meta.duration} */}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {videoDetails.title}
                    </Typography>
                    <Typography variant="p" color="text.secondary">
                      {videoDetails.duration}
                    </Typography>
                  </CardContent>

                </Card>
              </Grid>
              <Grid item xs={12} md={8}>
                <Grid container>
                  {videoDetails.medias.map((video, index) => <Card key={index} sx={{ maxWidth: 150, maxHeight: 200, margin: '15px' }}>
                    <CardContent style={{ textAlign: 'center' }}>
                      <Typography variant="p" component="div">
                        {video.quality}
                      </Typography>
                      <Typography variant="p" component="div">
                        {video.extension}
                      </Typography>
                      <Typography variant="p" component="div">
                        {video.formattedSize}
                      </Typography>
                      {video.audioAvailable ? <VolumeUpIcon /> : <VolumeOffIcon />}
                      {video.videoAvailable ? <VideocamIcon /> : <VideocamOffIcon />}
                      <Typography variant="p" component="div">
                        {video.formattedSize}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ marginTop: -2 }}>
                      <a href={video.url} size="small" target='_blank'><DownloadIcon /></a>
                    </CardActions>
                  </Card>)}
                </Grid>
              </Grid>
            </Grid>
          </Box> : console.log("Not OK")}

        </Box>
      </Container>
    </React.Fragment>
  );
}

export default App;
