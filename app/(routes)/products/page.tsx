"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import ProductCard from './components/product';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';

const API_URL = 'https://68351b7bcd78db2058c04635.mockapi.io/product/products';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    axios.delete(`${API_URL}/${productToDelete.id}`)
      .then(() => {
        setProducts(prev => prev.filter(p => p.id !== productToDelete.id));
        setShowDeleteConfirm(false);
        setProductToDelete(null);
      })
      .catch(err => console.error(err));
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleEditSave = () => {
    axios.put(`${API_URL}/${editingProduct.id}`, editingProduct)
      .then(res => {
        setProducts(prev => prev.map(p => p.id === res.data.id ? res.data : p));
        setEditingProduct(null);
      })
      .catch(err => console.error(err));
  };

  const handleEditChange = (field, value) => {
    setEditingProduct(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {products.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} onDelete={handleDelete} onEdit={handleEdit} />
          </Grid>
        ))}
      </Grid>

      {/* Edit Product Dialog */}
      <Dialog open={Boolean(editingProduct)} onClose={() => setEditingProduct(null)}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Title"
            fullWidth
            value={editingProduct?.title || ''}
            onChange={(e) => handleEditChange('title', e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            minRows={3}
            value={editingProduct?.description || ''}
            onChange={(e) => handleEditChange('description', e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingProduct(null)}>Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete `{productToDelete?.title}`?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
          <Button onClick={confirmDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}