// src/components/ThemeSelector.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Grid,
  Card,
  CardMedia,
  Typography,
  CircularProgress,
  Box,
  Fade,
  Paper,
  useTheme
} from '@mui/material';
import { ImageNotSupported, WebAsset, Palette } from '@mui/icons-material';

const ThemeSelector = () => {
  const [websiteType, setWebsiteType] = useState('');
  const [designTone, setDesignTone] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const websiteTypes = ['E-commerce', 'Service-Based', 'Informative'];
  const designTones = ['Professional', 'Playful and Chill', 'Relax'];

  useEffect(() => {
    if (websiteType && designTone) {
      fetchImages();
    }
  }, [websiteType, designTone]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/images/get-approved`, {
        params: { websiteType, designTone }
      });
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box 
        sx={{ 
          mt: 4, 
          mb: 6,
          textAlign: 'center'
        }}
      >
        <Typography 
          variant="h3" 
          sx={{ 
            mb: 2,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}
        >
          Theme Selection
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Choose your website preferences below
        </Typography>
      </Box>

      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mb: 4,
          background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)',
          borderRadius: 2
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <FormControl 
              fullWidth 
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            >
              <InputLabel><WebAsset sx={{ mr: 1 }} /> Website Type</InputLabel>
              <Select
                value={websiteType}
                label="Website Type"
                onChange={(e) => setWebsiteType(e.target.value)}
                sx={{
                  '& .MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center',
                  }
                }}
              >
                {websiteTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl 
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            >
              <InputLabel><Palette sx={{ mr: 1 }} /> Design Tone</InputLabel>
              <Select
                value={designTone}
                label="Design Tone"
                onChange={(e) => setDesignTone(e.target.value)}
                sx={{
                  '& .MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center',
                  }
                }}
              >
                {designTones.map((tone) => (
                  <MenuItem key={tone} value={tone}>
                    {tone}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {loading ? (
        <Fade in={true}>
          <Box 
            display="flex" 
            flexDirection="column" 
            justifyContent="center" 
            alignItems="center" 
            minHeight="300px"
          >
            <CircularProgress size={60} thickness={4} />
            <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
              Loading themes...
            </Typography>
          </Box>
        </Fade>
      ) : images.length > 0 ? (
        <Fade in={true} timeout={800}>
          <Grid container spacing={3}>
            {images.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={image._id}>
                <Fade in={true} timeout={500 + index * 100}>
                  <Card 
                    sx={{ 
                      transform: 'scale(1)',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.03)',
                        boxShadow: theme.shadows[10],
                      },
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="250"
                      image={image.imageUrl}
                      alt={`${image.websiteType} - ${image.designTone}`}
                      sx={{
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }}
                    />
                    <Box 
                      sx={{ 
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        bgcolor: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        p: 2,
                        transform: 'translateY(100%)',
                        transition: 'transform 0.3s ease-in-out',
                        '.MuiCard-root:hover &': {
                          transform: 'translateY(0)',
                        },
                      }}
                    >
                      <Typography variant="subtitle1">
                        {image.websiteType}
                      </Typography>
                      <Typography variant="body2">
                        {image.designTone}
                      </Typography>
                    </Box>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Fade>
      ) : websiteType && designTone ? (
        <Fade in={true}>
          <Box 
            display="flex" 
            flexDirection="column" 
            alignItems="center" 
            justifyContent="center" 
            minHeight="300px"
            sx={{
              background: 'linear-gradient(to right bottom, #f8f9fa, #e9ecef)',
              borderRadius: 2,
              p: 4,
            }}
          >
            <ImageNotSupported sx={{ fontSize: 80, color: 'grey.500', mb: 2 }} />
            <Typography variant="h5" color="text.secondary" sx={{ mb: 1 }}>
              No Matching Themes Found
            </Typography>
            <Typography variant="body1" color="text.secondary" textAlign="center">
              Try selecting different preferences to see more options
            </Typography>
          </Box>
        </Fade>
      ) : (
        <Fade in={true}>
          <Box 
            display="flex" 
            flexDirection="column"
            justifyContent="center" 
            alignItems="center" 
            minHeight="300px"
            sx={{
              background: 'linear-gradient(to right bottom, #f8f9fa, #e9ecef)',
              borderRadius: 2,
              p: 4,
            }}
          >
            <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
              Select Your Preferences
            </Typography>
            <Typography variant="body1" color="text.secondary" textAlign="center">
              Choose both website type and design tone to view matching themes
            </Typography>
          </Box>
        </Fade>
      )}
    </Container>
  );
};

export default ThemeSelector;