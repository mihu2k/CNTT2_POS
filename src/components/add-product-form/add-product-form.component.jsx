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
import { useStyles } from './add-product-form.style';

// import { numberWithCommas } from '../../common/utils';

import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { SketchPicker } from 'react-color';

function CreateProductForm(props) {
  const classes = useStyles();
  const Input = styled('input')({
    display: 'none',
  });
  const [color, setColor] = React.useState('');
  const [showColorPicker, setShowColorPicker] = React.useState(false);
  const [colors, setColors] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [colorNames, setColorNames] = React.useState([]);

  // const [products, setProducts] = React.useState([]);
  // const [isLoading, setIsLoading] = React.useState(false);
  const [category, setCategory] = React.useState('');
  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleColor = (updateColor) => {
    setColor(updateColor.hex);
  };

  const getAllColorInfo = () => {
    let inputColorName = document.getElementById('colorName');
    let inputFileImg = document.getElementById('fileToUpload');
    let colorName = inputColorName.value;
    let fileImg = inputFileImg.value;

    if (colorName !== '' && fileImg !== '' && color !== '') {
      setColors((array) => [...array, color]);
      setImages((array) => [...array, fileImg]);
      setColorNames((array) => [...array, colorName]);
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
    setColors([]);
    setImages([]);
    setColorNames([]);
    inputColorName.focus();
  };

  // fetch data from JSON server

  // const fetchProducts = async () => {
  //   // setIsLoading(true);
  //   const result = await axios.get('products');
  //   setProducts(await result.data);
  //   // setIsLoading(false);
  // };

  // React.useEffect(() => {
  //   fetchProducts();
  // }, []);

  let closeAddProducts = false;
  const sendData = () => {
    props.parentCallback(closeAddProducts);
  };
  console.log(closeAddProducts);

  return (
    <div className={classes.content}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            autoComplete="off"
            fullWidth
            label="Tên sản phẩm"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField fullWidth label="Thương hiệu" variant="outlined" />
        </Grid>
        <Grid item xs={6}>
          <TextareaAutosize
            aria-label="decs-product"
            minRows={5}
            placeholder="Thông số kỹ thuật"
            className={classes.textArea}
          />
        </Grid>
        <Grid item xs={6}>
          <TextareaAutosize
            aria-label="decs-product"
            minRows={5}
            placeholder="Phụ kiện đi kèm"
            className={classes.textArea}
          />
        </Grid>
        <Grid item xs={12}>
          <TextareaAutosize
            aria-label="decs-product"
            minRows={5}
            placeholder="Mô tả"
            className={classes.textArea}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            autoComplete="off"
            type="number"
            fullWidth
            label="Giá"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="select-category-label">Loại tai nghe</InputLabel>
            <Select
              labelId="select-category-label"
              id="select-category"
              value={category}
              label="Loại tai nghe"
              onChange={handleChange}
            >
              <MenuItem value={10}>Tai nghe 1</MenuItem>
              <MenuItem value={20}>Tai nghe 2</MenuItem>
              <MenuItem value={30}>Tai nghe 3</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <form autoComplete="off" method="post">
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
                value={colors}
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
            <Grid item xs={12} mt={2} className={classes.actionBtns}>
              <Button variant="contained">Tạo sản phẩm</Button>
              <Button
                variant="text"
                onClick={() => {
                  sendData();
                }}
              >
                Hủy
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default CreateProductForm;
