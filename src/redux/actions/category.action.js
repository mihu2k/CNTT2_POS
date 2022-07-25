import { CategoryService } from '../../services/category.service';
import * as types from '../types';

export const getCategoriesRequest = (query) => async (dispatch) => {
  dispatch({ type: types.GET_CATEGORIES_REQUEST });

  try {
    const response = await CategoryService.getAll(query);
    dispatch({ type: types.GET_CATEGORIES_SUCCESS, payload: response });
  } catch (error) {
    dispatch({ type: types.GET_CATEGORIES_FAILURE, payload: error });
  }
};
