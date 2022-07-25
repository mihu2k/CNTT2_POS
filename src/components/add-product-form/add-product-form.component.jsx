import React from 'react';
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
import { useStyles } from './add-product-form.style';
import { useDispatch, useSelector } from 'react-redux';
import { createProductRequest } from '../../redux/actions/product.action';
import * as types from '../../redux/types';
import { SketchPicker } from 'react-color';
import { getCategoriesRequest } from '../../redux/actions/category.action';
import { useNavigate } from 'react-router-dom';
import routes from '../../router/list.route';
import { showToastMsg } from '../../common/utils';

function CreateProductForm({ onClick }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Input = styled('input')({
    display: 'none',
  });

  const { category: categorySelector, product: productSelector } = useSelector(
    (state) => state,
  );

  const [state, setState] = React.useState({
    name: '',
    brand: '',
    description: '',
    price: '',
    categoryId: '',
    specifications: '',
    accessories: '',
    colors: [],
  });

  const {
    name,
    brand,
    description,
    price,
    categoryId,
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
  const [colorList, setColorList] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [colorNames, setColorNames] = React.useState([]);

  const handleColor = (updateColor) => {
    setColor(updateColor.hex);
  };

  const getAllColorInfo = () => {
    let inputColorName = document.getElementById('colorName');
    let inputFileImg = document.getElementById('fileToUpload');
    let colorName = inputColorName.value;
    let fileImg = inputFileImg.value;
    let fileImgSubmit = inputFileImg.files[0];
    if (colorName !== '' && fileImg !== '' && color !== '') {
      setColorList((array) => [...array, color]);
      setImages((array) => [...array, fileImg]);
      setColorNames((array) => [...array, colorName]);
      setState((prev) => {
        const colors = [...prev.colors];
        colors.push({ name: colorName, value: color, image: fileImgSubmit });
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
    setColorList([]);
    setImages([]);
    setColorNames([]);
    inputColorName.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !name ||
      !brand ||
      !description ||
      !price ||
      !categoryId ||
      !specifications ||
      !accessories ||
      !colors
    ) {
      setError('Vui lòng nhập tất cả các trường!');
    } else {
      const formData = new FormData();
      for (const key in state) {
        if (Object.hasOwnProperty.call(state, key)) {
          const element = state[key];
          formData.append(
            key,
            key === 'colors' ? JSON.stringify(element) : element,
          );
        }
      }
      colors.forEach((color) => {
        formData.append('images', color.image);
      });
      dispatch(createProductRequest(formData));
      setError('');
    }
  };

  const clearForm = () => {
    setState({
      name: '',
      brand: '',
      description: '',
      price: '',
      categoryId: '',
      specifications: '',
      accessories: '',
      colors: [],
    });
    resetAllColorInfo();
  };

  const handleAfterSuccess = () => {
    onClick();
  };

  const fetchCategory = (query = {}) => {
    dispatch(getCategoriesRequest(query));
  };

  React.useEffect(() => {
    fetchCategory();
  }, []);

  React.useEffect(() => {
    if (productSelector.status === types.CREATE_PRODUCT_SUCCESS) {
      clearForm();
      showToastMsg('success', 'Tạo thành công.', {
        onClose: () => handleAfterSuccess(),
        autoClose: 2000,
      });
    }
  }, [productSelector]);

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
              value={state.name}
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
              value={state.brand}
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
              value={state.specifications}
              placeholder="Thông số kỹ thuật"
              name="specifications"
              className={classes.textArea}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextareaAutosize
              minRows={5}
              value={state.accessories}
              name="accessories"
              placeholder="Phụ kiện đi kèm"
              className={classes.textArea}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaAutosize
              minRows={5}
              value={state.description}
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
              value={state.price}
              name="price"
              variant="outlined"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="select-category-label">Loại tai nghe</InputLabel>
              <Select
                labelId="select-category-label"
                id="select-category"
                value={state.categoryId}
                name="categoryId"
                label="Loại tai nghe"
                onChange={handleInputChange}
              >
                {categorySelector.categories?.map((category) => (
                  <MenuItem value={category._id} key={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
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
                  value={colorNames}
                  label="Tên màu đã thêm"
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={12} mt={2}>
                <TextField
                  fullWidth
                  value={colorList}
                  label="Mã màu đã thêm"
                  id="colorsPicked"
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={12} mt={2}>
                <TextField
                  fullWidth
                  value={images}
                  label="Hình ảnh tải lên"
                  variant="outlined"
                  disabled
                />
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} mt={2} className={classes.actionBtns}>
            <Button type="submit" variant="contained">
              Tạo sản phẩm
            </Button>
            <Button variant="text" onClick={onClick}>
              Hủy
            </Button>
          </Grid>
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </Grid>
      </form>
    </div>
  );
}

export default CreateProductForm;
