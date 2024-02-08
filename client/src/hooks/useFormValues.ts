import { useReducer } from 'react';

type ValueKey = string;

type ActionEditPayload = {
  inputKey: ValueKey;
  value: string;
};
type ActionErrorPayload = {
  inputKey: ValueKey;
  error: string;
};
type EditValueAction = {
  type: 'EDIT_VALUE';
  payload: ActionEditPayload;
};
type EditErrorAction = {
  type: 'EDIT_ERROR';
  payload: ActionErrorPayload;
};
type RestartValueAction = {
  type: 'RESET_VALUES';
};
type StateValue = {
  value: string;
  error: string;
};
type ActionTypes = EditValueAction | EditErrorAction | RestartValueAction;
type State = Record<ValueKey, StateValue>;
type StartingValues = Record<ValueKey, StateValue>;

let startingValuesInitial: StartingValues = {};

const formValuesReducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case 'EDIT_VALUE':
      return {
        ...state,
        [action.payload.inputKey]: {
          ...state[action.payload.inputKey],
          value: action.payload.value,
        },
      };
    case 'EDIT_ERROR':
      return {
        ...state,
        [action.payload.inputKey]: {
          ...state[action.payload.inputKey],
          error: action.payload.error,
        },
      };
    case 'RESET_VALUES':
      return { ...startingValuesInitial };
    default:
      return state;
  }
};

function useFormValues(initialValues: StartingValues = {}) {
  startingValuesInitial = initialValues;
  const [state, dispatch] = useReducer(formValuesReducer, {
    ...initialValues,
  }, () => initialValues);
  
  return {
    state,
    editValue: (values: ActionEditPayload) => dispatch({ type: 'EDIT_VALUE', payload: values }),
    editError: (values: ActionErrorPayload) => dispatch({ type: 'EDIT_ERROR', payload: values }),
    restartInputValues: () => dispatch({ type: 'RESET_VALUES' }),
  };
}

export default useFormValues;
