/*
Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

 

Example 1:

Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
Example 2:

Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
 

Constraints:

m == grid.length
n == grid[i].length
1 <= m, n <= 300
grid[i][j] is '0' or '1'.
*/


/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    
    if(grid === null || grid.length === 0 ){
        return 0;
    }
    
    // initialize our answer variable
    let numIslands = 0;
    
    // clone our grid since we'll be modifying it
    let tempGrid = [...grid];
    
    /**
     * Our scanner to visit all cells in an island
     * @param {array} grid
     * @param {int} i
     * @param {int} j
     * @return {int}
     */
    const exploreDFS = function(grid, i, j){
        
        // make sure we're never out of bounds or visiting a place that's already been visited
        if(i < 0 || i >= grid.length || j < 0 || j >= grid[i].length || grid[i][j] === 0){
            return 0;
        }
        
        grid[i][j] = 0;
        exploreDFS(grid, i + 1, j); // move right
        exploreDFS(grid, i - 1, j); // move left
        exploreDFS(grid, i, j + 1); // move up
        exploreDFS(grid, i, j - 1); // move move down
        
        return 1;
    };
    
    // explore our world by traversing through all cells
    for(let i = 0; i < tempGrid.length; i++){
        for(let j = 0; j < tempGrid[i].length; j++){
            
            // we only care for land mass. If we find one let's explore it
            if(tempGrid[i][j] == '1'){
                numIslands += exploreDFS(tempGrid, i, j);
            }
        }
    }
    
    return numIslands;
    
};