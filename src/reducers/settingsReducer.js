import {
  DISABLE_BALANCE_ON_ADD,
  DISABLE_BALANCE_ON_EDIT,
  ALLOW_REGISTRATION
} from "../actions/types";


export default (state = {}, action) => {
  switch (action.type) {
    case DISABLE_BALANCE_ON_ADD:
      return {
        ...state,
        disableBalOnAdd: action.payload
      };
    case DISABLE_BALANCE_ON_EDIT:
      return {
        ...state,
        disableBalOnEdit: action.payload
      };
    case ALLOW_REGISTRATION:
      return {
        ...state,
        allowReg: action.payload
      };

    default:
      return state;
  }
};
