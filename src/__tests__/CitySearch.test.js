/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable no-undef */
/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
/* eslint-disable testing-library/no-node-access */

import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import App from '../App';
import { extractLocations, getEvents } from '../api';

describe('<CitySearch/> component', () => {
    let CitySearchComponent;
    beforeEach(() => {
        CitySearchComponent = render(<CitySearch allLocations={[]} />);
    });

    // # TEST 1

    test('renders text input', () => {
        const cityTextBox = CitySearchComponent.queryByRole('textbox');

        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass('city');
    });

    // #TEST 2'

    test('suggestions list is hidden by default', () => {
        const suggestionList = CitySearchComponent.queryByRole('list');
        expect(suggestionList).not.toBeInTheDocument();
    });

    // #TEST 3

    test('renders a list of suggestions when city textbox gains focus', async () => {
        const user = userEvent.setup();
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.click(cityTextBox);
        const suggestionList = CitySearchComponent.queryByRole('list');
        expect(suggestionList).toBeInTheDocument();
        expect(suggestionList).toHaveClass('suggestions');
    });

    // #TEST4

    test('updates list of suggestions correctly when user types in city textbox', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
        CitySearchComponent.rerender(
            <CitySearch allLocations={allLocations} />
        );

        // user types "Berlin" in city textbox
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.type(cityTextBox, 'Berlin');

        // filter allLocations to locations matching "Berlin"
        const suggestions = allLocations
            ? allLocations.filter((location) => {
                  return (
                      location
                          .toUpperCase()
                          .indexOf(cityTextBox.value.toUpperCase()) > -1
                  );
              })
            : [];

        // get all <li> elements inside the suggestion list
        const suggestionListItems =
            CitySearchComponent.queryAllByRole('listitem');
        expect(suggestionListItems).toHaveLength(suggestions.length + 1);
        for (let i = 0; i < suggestions.length; i++) {
            expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
        }
    });

    // #TEST 5

    test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
        const user = userEvent.setup();
        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);
        CitySearchComponent.rerender(
            <CitySearch allLocations={allLocations} setCurrentCity={() => {}} />
        );

        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.type(cityTextBox, 'Berlin');

        // the suggestion's textContent look like this: "Berlin, Germany"
        const BerlinGermanySuggestion =
            CitySearchComponent.queryAllByRole('listitem')[0];

        await user.click(BerlinGermanySuggestion);

        expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
    });
});

// INTEGRATION TEST

describe('<CitySearch /> integration', () => {
    test('renders suggestions list when the app is rendered.', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;

        const CitySearchDOM = AppDOM.querySelector('#city-search');
        const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
        await user.click(cityTextBox);

        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);

        await waitFor(() => {
            const suggestionListItems =
                within(CitySearchDOM).queryAllByRole('listitem');
            expect(suggestionListItems.length).toBe(allLocations.length + 1);
        });
    });
});
