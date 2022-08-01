import * as React from 'react';
import Grid from '@mui/material/Grid';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { useStyles } from './edit-product-form.style';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductRequest,
  updateProductRequest,
} from '../../redux/actions/product.action';
import { getCategoriesRequest } from '../../redux/actions/category.action';
import ColorList from './list-color.component';
import { showToastMsg } from '../../common/utils';

function UpdateProductForm({ onClick, id }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { category: categorySelector } = useSelector((state) => state);

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
  const handleCkEditorChange = (e, editor) => {
    const data = editor.getData();
    console.log(data, 'data');
    setState((prev) => ({ ...prev, [name]: [data] }));
  };
  const [colorList, setColorList] = React.useState([]);

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
      const data = {
        name,
        brand,
        description,
        specifications,
        accessories,
        price,
        categoryId,
        colors: colorList,
      };
      const formData = new FormData();
      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          const element = data[key];
          formData.append(
            key,
            key === 'colors'
              ? JSON.stringify(
                  element?.map((item) => ({
                    name: item?.name,
                    value: item?.value,
                    image: typeof item?.image === 'string' ? item?.image : '',
                  })),
                )
              : element,
          );
        }
      }
      data.colors.forEach((color) => {
        if (typeof color.image !== 'string')
          formData.append('images', color.image);
      });
      dispatch(
        updateProductRequest(formData, id, () => {
          showToastMsg('success', 'Cập nhật thành công.', {
            toastId: id,
            autoClose: 2500,
            onClose: () => onClick(),
          });
        }),
      );
      console.log(formData, '---formData---');
      setError('');
    }
  };

  const { product } = useSelector((state) => state.product);

  const handleGetColorList = (colors) => {
    setColorList(colors);
  };

  const fetchCategory = (query = {}) => {
    dispatch(getCategoriesRequest(query));
  };

  React.useEffect(() => {
    fetchCategory();
    dispatch(getProductRequest(id));
  }, []);

  React.useEffect(() => {
    if (product) {
      setState({ ...product });
    }
  }, [product]);

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
            {/* <TextareaAutosize
              minRows={5}
              value={state.specifications || ''}
              placeholder="Thông số kỹ thuật"
              name="specifications"
              className={classes.textArea}
              onChange={handleInputChange}
            /> */}
            <InputLabel id="demo-simple-select-label">
              Thông số kỹ thuật
            </InputLabel>
            <CKEditor
              editor={ClassicEditor}
              name="specifications"
              data={state.specifications || ''}
              className={classes.textArea}
              onChange={(e, editor) => {
                setState((prev) => {
                  const data = editor.getData();
                  return {
                    ...prev,
                    specifications: data,
                  };
                });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            {/* <TextareaAutosize
              minRows={5}
              value={state.accessories || ''}
              name="accessories"
              placeholder="Phụ kiện đi kèm"
              className={classes.textArea}
              onChange={handleInputChange}
            /> */}

            <InputLabel id="demo-simple-select-label">
              Phụ kiện đi kèm
            </InputLabel>
            <CKEditor
              editor={ClassicEditor}
              name="accessories"
              data={state.accessories || ''}
              className={classes.textArea}
              onChange={(e, editor) => {
                setState((prev) => {
                  const data = editor.getData();
                  return {
                    ...prev,
                    accessories: data,
                  };
                });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            {/* <TextareaAutosize
              minRows={5}
              value={state.description || ''}
              name="description"
              placeholder="Mô tả"
              className={classes.textArea}
              onChange={handleInputChange}
            /> */}

            <InputLabel id="demo-simple-select-label">
              Mô tả sản phẩm
            </InputLabel>
            <CKEditor
              editor={ClassicEditor}
              name="description"
              data={state.description || ''}
              className={classes.textArea}
              onChange={(e, editor) => {
                setState((prev) => {
                  const data = editor.getData();
                  return {
                    ...prev,
                    description: data,
                  };
                });
              }}
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
                value={state.categoryId || ''}
                name="categoryId"
                label="Loại sản phẩm"
                onChange={handleInputChange}
              >
                {categorySelector.categories?.length > 0
                  ? categorySelector.categories?.map((category) => (
                      <MenuItem key={category?._id} value={category?._id}>
                        {category?.name}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <div>
              <ColorList
                colorList={state?.colors}
                getColorList={handleGetColorList}
              />
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
