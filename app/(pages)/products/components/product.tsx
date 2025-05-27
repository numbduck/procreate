import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function ProductCard({ product, onDelete, onEdit }) {
  return (
    <Card sx={{ maxWidth: 345,  height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        alt={product.title}
        image={product.image_src}
        sx={{ objectFit: 'cover', height: '200px' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" size="small" color="primary" onClick={() => onEdit(product)}>
          Edit
        </Button>
        <Button variant="outlined" size="small" color="error" onClick={() => onDelete(product)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
