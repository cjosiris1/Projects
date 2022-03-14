package project4MazeSolver;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;


// Charles Osiris

public class Driver {

	/**
	 * 
	 * @param start
	 * @param end
	 * find a path through the maze
	 * if found, output the path from start to end
	 * if not path exists, output a message stating so
	 * @throws FileNotFoundException 
	 * 
	 */
	// implement this method
	public static void depthFirst(MazeCell[][] cells, MazeCell start, MazeCell end) throws FileNotFoundException 
	{
		MyStack<MazeCell> stack = new MyStack<MazeCell>();
		int x = start.getRow();
		int y = start.getCol();
		
		// check if maze is at the end
		while (cells[x][y] != cells[end.getRow()][end.getCol()])
		{
			// RIGHT
			// check cell boundaries
			if (cells[x][y].getCol() < 5 && cells[x][y+1].unVisited() && cells[x][y+1].getRow() != -1 && cells[x][y+1].getCol() != -1)
			{
				//pushes cell contents, marks cell as visited, outputs top of stack value, and increments
				stack.push(cells[x][y]);
				cells[x][y].visit();
				System.out.println(stack.top());
				y++;				
			}
			
			
			// DOWN
			// check cell boundaries
			else if (cells[x][y].getRow() < 4 && cells[x+1][y].unVisited() && cells[x+1][y].getRow() != -1 && cells[x+1][y].getCol() != -1)
			{
				//pushes cell contents, marks cell as visited, outputs top of stack value, and increments
				stack.push(cells[x][y]);
				cells[x][y].visit();
				System.out.println(stack.top());
				x++;
			}
			
				
			// UP
			// check cell boundaries
			else if (cells[x][y].getRow() > 0 && cells[x-1][y].unVisited() && cells[x-1][y].getRow() != -1 && cells[x-1][y].getCol() != -1)
			{
				//pushes cell contents, marks cell as visited, outputs top of stack value, and increments
				cells[x][y].visit();
				stack.push(cells[x][y]);
				System.out.println(stack.top());
				x--;
			}
			
			
			// LEFT
			// check cell boundaries
			else if (cells[x][y].getCol() > 0 && cells[x][y-1].unVisited() && cells[x][y-1].getRow() != -1 && cells[x][y-1].getCol() != -1)
			{
				//pushes cell contents, marks cell as visited, outputs top of stack value, and increments
				stack.push(cells[x][y]);
				cells[x][y].visit();
				System.out.println(stack.top());
				y--;
			}
			
			else
			{
				// marks cell as visited, returns top of stack, and pops (removes top value)
				cells[x][y].visit();
				x = stack.top().getRow();
				y = stack.top().getCol();
				stack.pop();
			}
		}
	}

	public static void main(String[] args) throws FileNotFoundException {		
			
			//create the Maze from the file
			Scanner fin = new Scanner(new File("Maze.txt"));
			//read in the rows and cols
			int rows = fin.nextInt();
			int cols = fin.nextInt();
			
			//create the maze
			int [][] grid = new int[rows][cols];
			
			//read in the data from the file to populate
			for (int i = 0; i < rows; i++) {
				for (int j = 0; j < cols; j++) {
					grid[i][j] = fin.nextInt();
				}
			}

			//look at it 
			for (int i = 0; i < rows; i++) {
				for (int j = 0; j < cols; j++) {
					if (grid[i][j] == 3)
						System.out.print("S ");	
					else if (grid[i][j] == 4)
						System.out.print("E ");	
					else
						System.out.print(grid[i][j] + " ");
				}
				System.out.println();
			}

			//make a 2-d array of cells
			MazeCell[][] cells = new MazeCell[rows][cols];
			
			//populate with MazeCell obj - default obj for walls

			MazeCell start = new MazeCell(), end = new MazeCell();
			
			//iterate over the grid, make cells and set coordinates
			for (int i = 0; i < rows; i++) {
				for (int j = 0; j < cols; j++) {
					//make a new cell
					cells[i][j] = new MazeCell();
					//if it isn't a wall, set the coordinates
					if (grid[i][j] != 0) {
						cells[i][j].setCoordinates(i, j);
						//look for the start and end cells
						if (grid[i][j] == 3)
							start = cells[i][j];
						if (grid[i][j] == 4) 
							end = cells[i][j];
					}
				}
			}
			
			//testing
			System.out.println("start:"+start+" end:"+end);
			
			//solve it!
			depthFirst(cells, start, end);
			
		}
}

/*
 *
 * Provided starter code MazeCell class DO NOT CHANGE THIS CLASS
 *
 * models an open cell in a maze each cell knows its coordinates (row, col),
 * direction keeps track of the next unchecked neighbor\ cell is considered
 * 'visited' once processing moves to a neighboring cell the visited variable is
 * necessary so that a cell is not eligible for visits from the cell just
 * visited
 *
 */

class MazeCell {
	private int row, col;
	// direction to check next
	// 0: north, 1: east, 2: south, 3: west, 4: complete
	private int direction;
	private boolean visited;

	// set row and col with r and c
	public MazeCell(int r, int c) {
		row = r;
		col = c;
		direction = 0;
		visited = false;
	}

	// no-arg constructor
	public MazeCell() {
		row = col = -1;
		direction = 0;
		visited = false;
	}

	// copy constructor
	MazeCell(MazeCell rhs) {
		this.row = rhs.row;
		this.col = rhs.col;
		this.direction = rhs.direction;
		this.visited = rhs.visited;
	}

	public int getDirection() {
		return direction;
	}

	// update direction. if direction is 4, mark cell as visited
	public void advanceDirection() {
		direction++;
		if (direction == 4)
			visited = true;
	}

	// change row and col to r and c
	public void setCoordinates(int r, int c) {
		row = r;
		col = c;
	}

	public int getRow() {
		return row;
	}

	public int getCol() {
		return col;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		MazeCell other = (MazeCell) obj;
		if (col != other.col)
			return false;
		if (row != other.row)
			return false;
		return true;
	}

	// set visited status to true
	public void visit() {
		visited = true;
	}

	// reset visited status
	public void reset() {
		visited = false;
	}

	// return true if this cell is unvisited
	public boolean unVisited() {
		return !visited;
	}

	// may be useful for testing, return string representation of cell
	public String toString() {
		String output = "(" + row + "," + col + ")";
		return output;
	}
}