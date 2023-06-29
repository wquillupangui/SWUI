import React from 'react';

import renderApp from '../renderApp';
import configureStore from '../../src/store/store';
import { result } from './EntityList.mock';
import EntityList from "../../src/components/EntityList";
import * as ReduxService from "../../src/store/hooks";


describe('EntityDetail component', () => {
    const store = configureStore();
    const state = {
        entities: {
            loading: false,
            result
        },
    };

    const testUseAppSelector = (f: Function) => f(state);
    const dispatchMock = jest.fn();

    describe('When is loading', () => {
        it('should number present', async () => {
            const { getByText, getByTestId } = renderApp(<EntityList />);
            getByTestId('Loading')

        });
    })

    describe('When data is fetched', () => {
        beforeAll(() => {
            jest
                .spyOn(ReduxService, 'useAppSelector')
                .mockImplementation(testUseAppSelector)
            jest.spyOn(ReduxService, 'useAppDispatch')
                .mockReturnValue(dispatchMock)
        })

        it('Should the name of the list present ', async () => {
            const { findByText } = renderApp(<EntityList />);
            findByText('People')
        })

        it('Should the name of the first item in the list present', async () => {
            const { findByText } = renderApp(<EntityList />);
            findByText('Luke Skywalker')
        })

        it('Should the next link present ', async () => {
            const { findByText } = renderApp(<EntityList />);
            findByText('Next')
        })

    })
})