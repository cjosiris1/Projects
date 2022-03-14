package project3DLinkedList;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

/**
 * Provided file for DLinkedList Assignment 
 *
 * @author Charles Osiris
 */
public class DLinkedList<T extends Comparable<T>> {

    public static void main(String[] args) throws FileNotFoundException {

    	// set up doubly linked lists
        DLinkedList<String> lst1 = new DLinkedList<>();
        DLinkedList<String> lst2 = new DLinkedList<>();        

        // scans 1st text file
        Scanner fin = new Scanner(new File("text1.txt"));
        String str;

        // reads file
        while (fin.hasNext()) {
            str = fin.next();
            str = cleanUp(str); 
            lst1.insertOrderUnique(str);  
            //lst1.add(str);
        }
        fin.close();

        // scans 2nd text file
        fin = new Scanner(new File("text2.txt"));
        while (fin.hasNext()) {
            str = fin.next();
            str = cleanUp(str);
            lst2.insertOrderUnique(str);           
        }
 
        System.out.println("List 1:  " + lst1);
        System.out.println("List 2:  " + lst2);
        
        System.out.println("\nAFTER MERGE");
        
        DLinkedList combined = lst1.merge(lst2); 
        System.out.println("\n" + "Answer:" + combined);
        
    }

    /**
     * WORKING
     * @param str
     * @return str in all lower case with LEADING and TRAILING non-alpha
     * chars removed
     */
    public static String cleanUp(String str) {
    	String result = str.replaceAll("\\p{Punct}", "").toLowerCase();
        return result;
    }

    // inner Node class
    private class Node {
        private Node next;
        private Node previous;
        private T data;

        private Node(T val) {
            this.data = val;
            next = previous = this;
        }
    }

    // DLinkedList fields
    private Node head;

    // creates an empty list
    public DLinkedList() 
    {
        head = new Node(null);
    }

    /**
     * PROVIDED add method
     *
     * @param item return ref to newly inserted node
     */
    public Node add(T item) 
    {
        // makes a new node
        Node newNode = new Node(item);
        
        // updates newNode
        newNode.previous = head;
        newNode.next = head.next;
        
        // updates surrounding nodes
        head.next.previous = newNode;
        head.next = newNode;
        return newNode;
    }

    // converts to string
    public String toString() 
    {
        String str = "[";
        Node curr = head.next;
        while (curr != head) {
            str += curr.data + " ";
            curr = curr.next;
        }
        str = str.substring(0, str.length() - 1);
        return str + "]";
    }

    /**
     * WORKING
     * removes value from the list
     *
     * @param val
     * @return true if successful, false otherwise
     */
    public boolean remove(T val) 
    {
    	Node temp = head;							
		Node previous = new Node(val);			
		
		if (temp != null && temp.data == val)
		{
			head = temp.next;
		}
		
		while (temp != null && temp.data != val)
		{
			previous = temp;
			temp = temp.next;
		}
		
		previous.next = temp.next;
        return true;
    }

    /**
     * WORKING
     *
     * @param item
     */
    public void insertOrder(T item) 
    {
    	add(item);
    	Node current = null;
    	Node index = null;
    	T temp;
    	
    	if (head.next == null) // checks if the list is empty
    		return;
    	else
    	{
    		for (current = head.next; 								// current points to head
    			 current.next != null && current.data != null; 
    		     current = current.next)
    		{
    			for (index = current.next;							// index points to the node after current
    				 index != null && index.data != null;
    				 index = index.next)
    			{
    				if (current.data.compareTo(index.data) > 0) 	// if current's data is first alphabetically then swap with index
    				{
    					temp = current.data;
    					current.data = index.data;
    					index.data = temp;
    				}
    			
        		}
        	}
        }
    }

    /**
     * Checks if the item has data already
     * 
     * @param T item
     * @return boolean
     */
    public boolean hasItem(T item)
    {
    	Node current = head.next; // set current node to the first value in list
    	
    	while (current != head && current != null)	// while current does not equal null
    	{
    		if (current.data.compareTo(item) == 0)  // and if the current node has the data in the string
    		{
    			return true;						// return has item
    		}
    		current = current.next;					// go to next node
    	}
		return false;
    }
    
    /**
     * TO DO
     *
     * @param item
     */
    public boolean insertOrderUnique(T item) 
    {
    	if (hasItem(item)) // if the list has item already, return false
    	{
    		return false;
    	}
    		insertOrder(item); // else insert item into the list
    		return true;
    }

    /**
     * TO DO
     * PRE:  this and list are sorted lists
     * @param list
     * @return list 
     * POST:  returned list will not contain duplicates
     */
    public DLinkedList merge(DLinkedList list) 
    {
    	// sets list as head node
    	Node head = list.head;
    	Node current = head.next;
    	
    	while (current != head && current != null) // iterates through current and finds unique data to add
    	{
    		insertOrderUnique(current.data);
    		current = current.next;
    	}
    	
    	return this;
    }
}
