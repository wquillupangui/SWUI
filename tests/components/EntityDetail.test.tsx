
import React from 'react';
import EntityDetail from '../../src/components/EntityDetail';
import renderApp from '../renderApp';
import * as ReduxService from "../../src/store/hooks";

const state = {
    entities: {
        loading: false,
        selected: {
            name: 'Owen Lars',
            height: '178',
            mass: '120',
            hair_color: 'brown, grey',
            skin_color: 'light',
            eye_color: 'blue',
            birth_year: '52BBY',
            gender: 'male',
            homeworld: 'https://swapi.dev/api/planets/1/',
            films: [
                'https://swapi.dev/api/films/1/',
                'https://swapi.dev/api/films/5/',
                'https://swapi.dev/api/films/6/'
            ],
            species: [],
            vehicles: [],
            starships: [],
            created: '2014-12-10T15:52:14.024000Z',
            edited: '2014-12-20T21:17:50.317000Z',
            url: 'https://swapi.dev/api/people/6/'
        },
    },
};


const dispatchMock = jest.fn();


describe('EntityDetail component', () => {

    describe('When is loading', () => {
        it('should number present', async () => {
            const { getByText, getByTestId } = renderApp(<EntityDetail />);
            getByTestId('Loading')

        });
    })



    describe('When data was fetched', () => {

        const testUseAppSelector = (f: Function) => f(state);
        beforeAll(() => {
            jest
                .spyOn(ReduxService, 'useAppSelector')
                .mockImplementation(testUseAppSelector)
            jest.spyOn(ReduxService, 'useAppDispatch')
                .mockReturnValue(dispatchMock)
        })

        it('Should the name present ', async () => {
            const { findByText } = renderApp(<EntityDetail />);
            findByText('People')
        })

        it('Should the name present ', async () => {
            const { findByText } = renderApp(<EntityDetail />);
            findByText('Owen Lars')
        })

        it('Should the first child link present ', async () => {
            const { findByText } = renderApp(<EntityDetail />);
            findByText('Films 1')
        })

    })

});
