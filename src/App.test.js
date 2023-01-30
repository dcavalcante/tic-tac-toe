// TODO: Add tests for how:
// it "Handles AI moves using random algorithm"
// it "Handles AI moves using minimax algorithm"
// it "Handles AI moves using minimax with alpha-beta pruning algorithm"

import React from 'react';
import { render, fireEvent, cleanup, getAllByRole } from '@testing-library/react';
import App, { algorithms } from './App';


describe('App', () => {
  afterEach(cleanup);

  it('Renders Tic-Tac-Toe board with 9 squares', () => {
    const { container } = render(<App />);
    const squares = container.querySelectorAll('.square');
    expect(squares.length).toBe(9);
  });

  it('Updates board when square is clicked', () => {
    const { container } = render(<App />);
    const squares = container.querySelectorAll('.square');
    fireEvent.click(squares[0]);
    expect(squares[0].textContent).toBe('X');
  });

  it('Renders AI algorithm selection dropdown with right options', () => {
    const { getByText, getByRole } = render(<App />);
    const select = getByRole('combobox');
    expect(select).toBeInTheDocument();
    algorithms.forEach(option => {
      const dropdownOption = getByText(option.text);
      expect(dropdownOption).toBeInTheDocument();
    });
  });

  it('Handles selection of player O', () => {
    const { getByRole, getAllByRole } = render(<App />);
    const select = getByRole('combobox');
    const options = getAllByRole('option');
    fireEvent.change(select, { target: { value: options[1].value } });
    expect(options[1].selected).toBeTruthy();
  });

  it('Resets game board when reset button is clicked', () => {
    const { container } = render(<App />);
    const squares = container.querySelectorAll('.square');
    fireEvent.click(squares[0]);
    fireEvent.click(squares[1]);
    const resetButton = container.querySelector('button');
    fireEvent.click(resetButton);
    squares.forEach(square => {
      expect(square.textContent).toBe('');
    });
  });

  it('Declares winner when game is over', () => {
    const { container, getByText } = render(<App />);
    const squares = container.querySelectorAll('.square');
    // make the first player win
    fireEvent.click(squares[0]);
    fireEvent.click(squares[3]);
    fireEvent.click(squares[1]);
    fireEvent.click(squares[4]);
    fireEvent.click(squares[2]);
    expect(container.querySelector('.turn').textContent).toBe("The winner is X")
    // make sure you can't keep playing after the game is over
    fireEvent.click(squares[5]);
    expect(squares[5].textContent).toBe('');
  });

  it('Prevents player moves on occupied squares', () => {
    const { container } = render(<App />);
    const squares = container.querySelectorAll('.square');
    fireEvent.click(squares[0]);
    fireEvent.click(squares[0]);
    expect(squares[0].textContent).toBe('X');
  });

  it('Renders and updates next player indicator', () => {
    const { container } = render(<App />);
    const squares = container.querySelectorAll('.square')
    expect(container.querySelector('.turn').textContent).toBe("Next player: X")
    fireEvent.click(squares[0])
    expect(container.querySelector('.turn').textContent).toBe("Next player: O")
    fireEvent.click(squares[1])
    expect(container.querySelector('.turn').textContent).toBe("Next player: X")
  });

  it("Handles Draw Game scenario", () => {
    const { container } = render(<App />);
    const squares = container.querySelectorAll('.square');
    // Click each square in order
    fireEvent.click(squares[0]);
    fireEvent.click(squares[1]);
    fireEvent.click(squares[2]);
    fireEvent.click(squares[3]);
    fireEvent.click(squares[4]);
    // Make sure it ends in draw
    fireEvent.click(squares[6]);
    fireEvent.click(squares[5]);
    fireEvent.click(squares[8]);
    fireEvent.click(squares[7]);
    expect(container.querySelector('.turn').textContent).toEqual('Game Draw');
  })

});
