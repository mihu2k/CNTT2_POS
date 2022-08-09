import * as React from 'react';

import { useStyles } from './product-box.style';
// import { numberWithCommas } from '../../common/utils';
import cx from 'classnames';

import { Button, Grid } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { numberWithCommas } from '../../common/utils';

export default function ProductBox({ product, onPush }) {
  const classes = useStyles();
  const [infoByColor, setInfoByColor] = React.useState(product?.colors[0]);

  const handleClickColor = (color) => {
    const index = product.colors?.findIndex((item) => item.value === color);
    setInfoByColor(product?.colors[index > -1 ? index : 0]);
  };

  const handlePush = () => {
    onPush(product, infoByColor);
  };

  return (
    <Grid item xs={4}>
      <div
        className={classes.productWrap}
        // onClick={() => addProductToCart(product)}
      >
        <img
          src={`${process.env.REACT_APP_API_BASE_URL}${infoByColor?.image}`}
          className={classes.imgFluid}
          alt={product.name}
        />
        <p className={classes.productName}>{product.name}</p>
        <p>({product.code})</p>
        <div className={classes.wrapChooseColor}>
          {product.colors.length > 0
            ? product.colors.map((color) => (
                <div
                  key={color.value}
                  className={cx('boxChooseColor', classes.wrapCircleBox)}
                  style={
                    color.value === infoByColor?.value
                      ? {
                          border: '1px solid #333',
                          cursor: 'pointer',
                        }
                      : {
                          border: '1px solid transparent',
                          cursor: 'pointer',
                        }
                  }
                >
                  <div
                    className={cx(classes.circleBox)}
                    style={{
                      backgroundColor: color.value,
                    }}
                    onClick={() => handleClickColor(color.value)}
                  />
                </div>
              ))
            : null}
        </div>

        <p className={classes.productPrice}>
          {numberWithCommas(product.price)}&nbsp;&#8363;
        </p>
        <Button variant="contained" fullWidth onClick={handlePush}>
          Thêm
        </Button>
      </div>
    </Grid>
  );
}
