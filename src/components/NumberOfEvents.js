const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
    const handleInputChanged = (event) => {
        const value = event.target.value;
        setCurrentNOE(value);

        let infoText;
        if (isNaN(value) || value <= 0) {
            infoText = 'Please enter a number greater than 0.';
            setErrorAlert(infoText);
        } else {
            infoText = '';
            setErrorAlert(infoText);
            setCurrentNOE(value);
        }
    };

    return (
        <div id='number-of-events'>
            <label htmlFor='number-of-events-input'>Number of Events: </label>
            <input
                type='text'
                id='number-of-events-input'
                className='number-of-events-input'
                defaultValue='32'
                onChange={handleInputChanged}
                data-testid='numberOfEventsInput'
            />
        </div>
    );
};

export default NumberOfEvents;
