import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import SendIcon from '@mui/icons-material/Send';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useStyles } from './edit-product-form.style';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductRequest,
  updateProductRequest,
} from '../../redux/actions/product.action';

import 'react-toastify/dist/ReactToastify.css';
import { SketchPicker } from 'react-color';

function UpdateProductForm({ props, onClick, id }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const closeEditForm = () => {
    onClick(onClick);
  };
  const Input = styled('input')({
    display: 'none',
  });

  const [state, setState] = React.useState({
    name: '',
    brand: '',
    description: '',
    price: '',
    category: 0,
    specifications: '',
    accessories: '',
    colors: [],
  });

  const {
    name,
    brand,
    description,
    price,
    category,
    specifications,
    accessories,
    colors,
  } = state;

  const [error, setError] = React.useState('');

  const handleInputChange = (e) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [color, setColor] = React.useState('');
  const [showColorPicker, setShowColorPicker] = React.useState(false);

  const handleColor = (updateColor) => {
    setColor(updateColor.hex);
  };

  const getAllColorInfo = () => {
    let inputColorName = document.getElementById('colorName');
    let inputFileImg = document.getElementById('fileToUpload');
    let colorName = inputColorName.value;
    let fileImg = inputFileImg.value;
    let fileImgSubmit = inputFileImg.files[0];
    // eslint-disable-next-line no-mixed-operators
    if (colorName !== '' || (fileImg !== '' && color !== '')) {
      setState((prev) => {
        const colors = [...prev.colors];
        colors.push({
          name: colorName,
          value: color,
          image: fileImgSubmit,
        });
        return {
          ...prev,
          colors,
        };
      });
      inputColorName.value = '';
      setShowColorPicker(false);
      alert('Thêm màu và hình ảnh sản phẩm thành công!');
      inputColorName.focus();
    } else {
      alert('Vui lòng nhập thông tin màu!');
      inputColorName.value = '';
      inputColorName.focus();
    }
  };

  const resetAllColorInfo = () => {
    let inputColorName = document.getElementById('colorName');

    inputColorName.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !name ||
      !brand ||
      !description ||
      !price ||
      !category ||
      !specifications ||
      !accessories ||
      !colors
    ) {
      setError('Vui lòng nhập tất cả các trường!');
    } else {
      dispatch(updateProductRequest(state, id));
      setError('');
      alert('Cập nhật sản phẩm thành công!');
    }
  };

  React.useEffect(() => {
    dispatch(getProductRequest(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { product } = useSelector((state) => state.product);

  React.useEffect(() => {
    if (product) {
      setState({ ...product });
    }
  }, [product]);

  console.log(product);
  return (
    <div>
      <form
        className={classes.content}
        autoComplete="off"
        onSubmit={handleSubmit}
        method="post"
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              autoComplete="new-password"
              value={state.name || ''}
              label="Tên sản phẩm"
              type="text"
              name="name"
              variant="outlined"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              autoComplete="off"
              value={state.brand || ''}
              label="Thương hiệu"
              type="text"
              name="brand"
              variant="outlined"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextareaAutosize
              minRows={5}
              value={state.specifications || ''}
              placeholder="Thông số kỹ thuật"
              name="specifications"
              className={classes.textArea}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextareaAutosize
              minRows={5}
              value={state.accessories || ''}
              name="accessories"
              placeholder="Phụ kiện đi kèm"
              className={classes.textArea}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              minRows={5}
              value={state.description || ''}
              name="description"
              placeholder="Mô tả"
              className={classes.textArea}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              autoComplete="off"
              type="number"
              fullWidth
              label="Giá"
              value={state.price || ''}
              name="price"
              variant="outlined"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="select-category-label">Loại sản phẩm</InputLabel>
              <Select
                labelId="select-category-label"
                id="select-category"
                value={state.category || ''}
                name="category"
                label="Loại sản phẩm"
                onChange={handleInputChange}
              >
                <MenuItem value={1}>Tai nghe nhét tai</MenuItem>
                <MenuItem value={2}>Tai nghe trùm đầu</MenuItem>
                <MenuItem value={3}>Tai nghe True Wireless</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <div>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  label="Nhập tên màu"
                  variant="outlined"
                  id="colorName"
                />
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" alignItems="center" spacing={2} mt={2}>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setShowColorPicker((showColorPicker) => !showColorPicker);
                    }}
                  >
                    {showColorPicker ? 'Đóng chọn màu' : 'Chọn màu'}
                  </Button>
                  <label htmlFor="fileToUpload">
                    <Input accept="image/*" id="fileToUpload" type="file" />
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                  <Button
                    variant="outlined"
                    endIcon={<SendIcon />}
                    onClick={getAllColorInfo}
                  >
                    Thêm màu
                  </Button>
                  <Button
                    variant="text"
                    endIcon={<RotateLeftIcon />}
                    onClick={resetAllColorInfo}
                  >
                    Xóa tất cả
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs={12} mt={2}>
                {showColorPicker && (
                  <SketchPicker color={color} onChange={handleColor} />
                )}
              </Grid>

              <Grid item xs={12} mb={2} mt={2}>
                <TextField
                  fullWidth
                  value={state.colors.map((colorName) => colorName.name)}
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={12} mt={2}>
                <TextField
                  fullWidth
                  value={state.colors.map((valueColor) => valueColor.value)}
                  id="colorsPicked"
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={12} mt={2}>
                <TextField
                  fullWidth
                  value={state.colors.map((image) => image.image)}
                  id="colorsPicked"
                  variant="outlined"
                  disabled
                />
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} mt={2} className={classes.actionBtns}>
            <Button type="submit" variant="contained">
              Cập nhật sản phẩm
            </Button>
            <Button variant="text" onClick={onClick}>
              Quay về
            </Button>
          </Grid>
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </Grid>
      </form>
    </div>
  );
}

export default UpdateProductForm;
