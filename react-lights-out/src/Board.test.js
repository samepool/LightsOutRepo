import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Board from "./Board";

describe("<Board /> rendering", function () {
    describe("initial board and win state", function () {
        it("renders without crashing", function () {
            render(<Board />);
        });

        it("matches snapshort for full board", function () {
            const {asFragment } = render(<Board chanceLightStartsOn={1} />);
            expect(asFragment("You Win!")).toBeInTheDocument();
        });

        it("shows win state when lights are out", function () {
            const { getByText } = render(<Board chanceLightStartsOn={0} />);
            expect(getByText("You Win!")).toBeInTheDocument();
        });
    });

    describe("cell click", function () {
        it("toggles lights correctly", function () {
            const { getAllByRole } = render(
                <Board nrows={3} ncols={3} chanceLightStartsOn={1} />,
            );
            const cells = getAllByRole("button");

            cells.forEach(cells => {
                expect(cell).toHaveClass("Cell-lit");
            });

            fireEvent.click(cells[4]);

            let litIndices = [0, 2, 6, 8];
            cells.forEach((cell, idx) => {
                if (litIndices.includes(idx)) {
                    expect(cell).toHaveClass("Cell-lit");
                } else {
                    expect(cell).not.toHaveClass("Cell-lit");
                }
            });
        });

        it("says that you won when you click the board", function () {
            const { queryByText, getAllByRole } = render(
                <Board nrows={1} ncols={3} chanceLightStartsOn={1} />,
            );

            expect(queryByText("You Win!")).not.toBeInTheDocument();

            const cells = getAllByRole("button");
            fireEvent.click(cells[1]);
            expect(queryByText("You Win!")).toBeInTheDocument();
        });
    });
});