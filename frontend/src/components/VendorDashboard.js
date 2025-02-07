// src/components/VendorDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Chip,
  IconButton,
  Fade,
  Paper
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon
} from '@mui/icons-material';

const VendorDashboard = () => {
  const [images, setImages] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editImage, setEditImage] = useState(null);
  const [formData, setFormData] = useState({
    imageUrl: '',
    websiteType: '',
    designTone: '',
  });

  const websiteTypes = ['E-commerce', 'Service-Based', 'Informative'];
  const designTones = ['Professional', 'Playful and Chill', 'Relax'];

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/images/vendor-images');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editImage) {
        await axios.put(`http://localhost:5000/api/images/update/${editImage._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/images/add', formData);
      }
      setOpenDialog(false);
      setEditImage(null);
      setFormData({ imageUrl: '', websiteType: '', designTone: '' });
      fetchImages();
    } catch (error) {
      console.error('Error saving image:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await axios.delete(`http://localhost:5000/api/images/delete/${id}`);
        fetchImages();
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }
  };

  const handleEdit = (image) => {
    setEditImage(image);
    setFormData({
      imageUrl: image.imageUrl,
      websiteType: image.websiteType,
      designTone: image.designTone,
    });
    setOpenDialog(true);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ 
          mb: 2,
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold'
        }}>
          Vendor Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Manage Your Theme Collection
        </Typography>
      </Box>

      {/* Add New Theme Button */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            }
          }}
        >
          Add New Theme
        </Button>
      </Box>

      {/* Image Grid */}
      <Grid container spacing={3}>
        {images.map((image, index) => (
          <Grid item xs={12} sm={6} md={4} key={image._id}>
            <Fade in={true} timeout={500 + index * 100}>
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6,
                }
              }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={image.imageUrl}
                  alt={`${image.websiteType} - ${image.designTone}`}
                  sx={{
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    }
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      icon={image.status === 'Approved' ? <CheckCircleIcon /> : <PendingIcon />}
                      label={image.status}
                      color={image.status === 'Approved' ? 'success' : 'warning'}
                      sx={{ mb: 1 }}
                    />
                  </Box>
                  <Typography variant="subtitle1" gutterBottom>
                    {image.websiteType}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {image.designTone}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Button
                      startIcon={<EditIcon />}
                      variant="outlined"
                      size="small"
                      onClick={() => handleEdit(image)}
                      sx={{ flex: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      startIcon={<DeleteIcon />}
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(image._id)}
                      sx={{ flex: 1 }}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => {
          setOpenDialog(false);
          setEditImage(null);
          setFormData({ imageUrl: '', websiteType: '', designTone: '' });
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editImage ? 'Edit Theme' : 'Add New Theme'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Image URL"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              margin="normal"
              required
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Website Type</InputLabel>
              <Select
                value={formData.websiteType}
                label="Website Type"
                onChange={(e) => setFormData({ ...formData, websiteType: e.target.value })}
                required
              >
                {websiteTypes.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Design Tone</InputLabel>
              <Select
                value={formData.designTone}
                label="Design Tone"
                onChange={(e) => setFormData({ ...formData, designTone: e.target.value })}
                required
              >
                {designTones.map((tone) => (
                  <MenuItem key={tone} value={tone}>{tone}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={() => {
              setOpenDialog(false);
              setEditImage(null);
              setFormData({ imageUrl: '', websiteType: '', designTone: '' });
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            }}
          >
            {editImage ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default VendorDashboard;