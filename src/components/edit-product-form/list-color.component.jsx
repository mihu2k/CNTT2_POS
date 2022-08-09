import { blue, red } from '@material-ui/core/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import RefreshIcon from '@mui/icons-material/Refresh';
import SendIcon from '@mui/icons-material/Send';
import {
  Button,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { HuePicker, SketchPicker } from 'react-color';
import { useSelector } from 'react-redux';
import { showToastMsg } from '../../common/utils';

export default function ColorList({ colorList, getColorList }) {
  const [colors, setColors] = React.useState([]);
  const { product: productSelector } = useSelector((state) => state);

  const [showColorPicker, setShowColorPicker] = React.useState(false);
  const [colorForm, setColorForm] = React.useState({
    name: '',
    value: '#000',
    image: null,
  });

  const handleChangeColorForm = (color) => {
    setColorForm((prev) => ({ ...prev, value: color.hex }));
  };

  const handleChangForm = (e) => {
    if (e.target.name === 'name') {
      setColorForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
    if (e.target.name === 'image') {
      setColorForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.files[0] ?? null,
      }));
    }
  };

  const handleAddColor = () => {
    if (!colorForm.image || !colorForm.name) return;
    const newColors = [...colors];
    const colorValueList = newColors.map((item) => item.value);
    if (colorValueList?.includes(colorForm.value)) {
      showToastMsg('warning', 'Mã màu đã tồn tại.', {
        toastId: colorForm.value,
        autoClose: 3000,
      });
      return;
    }
    newColors.push(colorForm);
    setColors(newColors);
  };

  const handleChange = (e, index) => {
    const newColors = [...colors];
    if (e.target.name?.includes('name-')) {
      newColors[index].name = e.target.value;
    }
    if (e.target.name === 'image' && e.target.files[0]) {
      newColors[index].image = e.target.files[0];
    }
    setColors(newColors);
  };

  const handleChangeColorList = (colorHex, index) => {
    const newColors = [...colors];
    newColors[index].value = colorHex.hex;
    setColors(newColors);
  };

  const handleRefreshColor = (id) => {
    const newColors = [...colors];
    const index = newColors.findIndex((item) => item.id === id);
    if (index === -1) return;
    const colorListClone = [...colorList];
    newColors[index] = colorListClone[id];
    setColors(newColors);
  };

  const handleRemoveColor = (index) => {
    const newColors = [...colors].filter((_item, idx) => idx !== index);
    setColors(newColors);
  };

  React.useEffect(() => {
    getColorList(colors);
  }, [colors]);

  React.useEffect(() => {
    colorList?.length > 0 &&
      setColors(() => {
        const colors = colorList?.map((item, index) => ({
          ...item,
          id: index,
        }));
        return colors;
      });
  }, [colorList]);

  // console.log(colors, '---COLORS---');
  // console.log(productSelector, '---productSelector---');
  // console.log(colorList, '---productSelector colorList---');

  return (
    <>
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center" spacing={2} mt={2}>
          <TextField
            autoComplete="off"
            label="Nhập tên màu"
            variant="outlined"
            name="name"
            value={colorForm.name}
            onChange={handleChangForm}
          />
          <Button
            variant="outlined"
            onClick={() => setShowColorPicker(!showColorPicker)}
          >
            {showColorPicker ? 'Đóng chọn màu' : 'Chọn màu'}
          </Button>
          <label htmlFor="fileToUpload">
            <input
              accept="image/*"
              id="fileToUpload"
              type="file"
              name="image"
              hidden
              onChange={handleChangForm}
            />
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
            onClick={handleAddColor}
          >
            Thêm màu
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12} mt={2}>
        {showColorPicker && (
          <SketchPicker
            color={colorForm.value}
            onChange={handleChangeColorForm}
          />
        )}
      </Grid>

      <Grid item xs={12} mt={2}>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell>Tên màu</TableCell>
              <TableCell>Mã màu</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {colors?.length > 0 ? (
              colors?.map((color, index) => (
                <TableRow key={color?.image + color?.value}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <label
                      htmlFor={`editImageProduct${index}`}
                      style={{ alignItems: 'center', cursor: 'pointer' }}
                      className="d-f"
                    >
                      <input
                        accept="image/*"
                        id={`editImageProduct${index}`}
                        type="file"
                        name="image"
                        hidden={true}
                        onChange={(e) => handleChange(e, index)}
                      />
                      <img
                        src={
                          typeof color?.image === 'string'
                            ? `${process.env.REACT_APP_API_BASE_URL}${color?.image}`
                            : URL.createObjectURL(color?.image)
                        }
                        alt="Product Image"
                        style={{
                          width: '50px',
                          height: '50px',
                          border: '1px solid #f1f1f1',
                          borderRadius: '8px',
                        }}
                      />
                    </label>
                  </TableCell>
                  <TableCell>
                    <TextField
                      label="Tên màu"
                      variant="standard"
                      name={`name-${index}`}
                      value={color?.name}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <SelectColorHex
                      color={color?.value}
                      onChangeColorList={(colorHex) =>
                        handleChangeColorList(colorHex, index)
                      }
                    />
                  </TableCell>
                  <TableCell align="right">
                    {color?.id !== undefined && (
                      <IconButton
                        color="secondary"
                        onClick={() => handleRefreshColor(color?.id)}
                      >
                        <RefreshIcon style={{ color: blue[500] }} />
                      </IconButton>
                    )}
                    <IconButton
                      color="secondary"
                      onClick={() => handleRemoveColor(index)}
                    >
                      <DeleteIcon style={{ color: red[500] }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell style={{ border: 'none' }}>
                  <Typography variant="p" margin="16px 0 0">
                    Lỗi hiển thị màu của sản phẩm.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Grid>
    </>
  );
}

function SelectColorHex({ color, onChangeColorList }) {
  const [colorPick, setColorPick] = React.useState(color);

  const handleChange = (color) => {
    setColorPick(color.hex);
  };

  const handleSubmitColor = (color) => {
    // console.log(color);
    onChangeColorList(color);
  };

  React.useEffect(() => {
    setColorPick(color);
  }, [color]);

  return (
    <Stack direction="row" alignItems="center" spacing={3}>
      <div
        style={{
          backgroundColor: colorPick,
          width: '22px',
          height: '22px',
          border: '1px solid #ccc',
        }}
      />
      <HuePicker
        color={colorPick}
        onChange={handleChange}
        onChangeComplete={handleSubmitColor}
      />
    </Stack>
  );
}
