// actions.ts

export const SELECT_FAMILY = 'SELECT_FAMILY';

export interface SelectFamilyAction {
    type: typeof SELECT_FAMILY;
    payload: string;
}

export const selectFamily = (family: string): SelectFamilyAction => ({
    type: SELECT_FAMILY,
    payload: family,
});

export type InstrumentActionTypes = SelectFamilyAction;

export type AppAction = SelectFamilyAction;