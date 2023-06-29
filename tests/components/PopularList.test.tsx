import React from 'react';

import renderApp from '../renderApp';
import configureStore from '../../src/store/store';
import EntityList from "../../src/components/EntityList";
import * as ReduxService from "../../src/store/hooks";
import PopularList from '../../src/components/PopularList';


describe('PopularList component', () => {
    const store = configureStore();
    const state = {
        popular: {
            popularItems: {
                '/starships/9/': {
                    name: 'Death Star',
                    type: 'starships',
                    url: '/starships/9/',
                    count: 3
                },
                '/planets/1/': {
                    name: 'Tatooine',
                    type: 'planets',
                    url: '/planets/1/',
                    count: 8
                },
                '/films/1/': {
                    name: 'A New Hope',
                    type: 'films',
                    url: '/films/1/',
                    count: 3
                }
            }
        }

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
            const { findByText } = renderApp(<PopularList />);
            findByText('Popular')
        })

        it('Should the name of the first item in the list present', async () => {
            const { findByText } = renderApp(<PopularList />);
            findByText('Tatooine')
        })

        it('Should the name of the first item count in the list present', async () => {
            const { findByText } = renderApp(<PopularList />);
            findByText('8')
        })


    })
})