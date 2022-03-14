package project2;

import java.util.List;

import org.w3c.dom.Node;

public class Test 
{
	Node head;
	public int size;
	
	// Node Class
	public static class Node
	{
		int data;
		Node next;
		
		Node(int d)
		{
			data = d;
			next = null;
		}
	}
	
	void front(int newData)
	{
		Node newNode = new Node(newData); // builds node
		newNode.next = head;			  // sets next node to null
		head = newNode; 				  // sets beginning to the newly created node
		size++;							  // increments size to display
	}
	
	void back(int newData)
	{
		Node newNode = new Node(newData); 			// builds node
		Node temp = head; 							// builds temporary node
		
		newNode.data = newData; 					// adds data member to new node
		while (temp.next != null)
		{
			temp = temp.next; 						// goes to the end of the list
		}
		temp.next = newNode;						// next nodes set as the new node
		size++;										// increments size to display
	}
	
	void insertPos(int pos, int newData)
	{
		Node newNode = new Node(newData);   // builds node
		Node temp = head;					// sets temporary node to null
		Node previous = new Node(newData);  // builds previous node
		int position = pos;                 // initiates where the loop will stop
		newNode.data = newData;				//initiates new node's data to input data
		
		for (int i = 1; i < position; i++)
		{
			previous = temp; 				// swaps positions so we can access the pointers
			temp = temp.next; 				// moves the temporary node
		}
		previous.next = newNode; 			// sets data into the list
		newNode.next = temp; 				// points to the next node
	}
	
	void remove(int newData)
	{
		Node temp = head;							// sets temp to null
		Node previous = new Node(newData);			
		
		if (temp != null && temp.data == newData)
		{
			head = temp.next;
		}
		
		while (temp != null && temp.data != newData)
		{
			previous = temp;
			temp = temp.next;
		}
		
		previous.next = temp.next;
		size--;
	}
	
	public boolean empty()
	{
		System.out.println("Is the list empty?");
		return head == null;
	}
	
	void size()
	{
		System.out.println("Amount of elements in list: " + size);
	}
	
	Node reverse()
	{
		if (head == null)
		{
			return head;
		}
		
		Node current = head;			// sets current node to head
		Node previous = null;			// sets the previous node to null
		Node next = null;				// sets the next node to null
		
		while (current != null)
		{
			next = current.next;		// while the current node is not null set next to current node's next
			current.next = previous;	// current node's next value is set to previous
			previous = current;			// previous node is set to the current node's value
			current = next;				// current node is set to the value that was next
		}
		return previous;				// previous node is returned
	}
	
	public Test insert(Test list, int data)
	{
		Node newNode = new Node(data); // create a new node with int data
		newNode.next = null;		   // sets next to null
		
		if (list.head == null) 
		{
			list.head = newNode; 	   // make new node as head if list is empty
		}
		else 
		{
			Node last = list.head;	   // sets last node to null
			while (last.next != null)
			{
				last = last.next;	   // goes to next
			}
			last.next = newNode;	   // sets as new node
		}
		return list;				   // returns full list
	}
	
	public void printList(Test list)
	{
		Node currNode = list.head; 					// creates new node as a current node
		while (currNode != null) 					// goes through the linked list
		{
			System.out.println(currNode.data + ""); // prints the data at the current node
			currNode = currNode.next; 				// goes to the next node
		}
	}
	
	// Display
	void display()
	{
		Node temp;						   // initializes temporary node
		temp = head;					   // sets node to null
		
		while (temp != null)
		{
			System.out.println(temp.data); // prints temporary data
			temp = temp.next;			   // goes to next node
		}
	}
	
	// Merge
	public void merge(Test lst)
	{
		Node temp;
		temp = lst.head;
		
		while (temp != null)
		{
			this.insert(lst, temp.data);
			temp = temp.next;
		}
	}

	public static void main(String[] args) 
	{
		// ...
		Test test = new Test();					// create test list for nodes
		Test list = new Test(); 				// create list
		System.out.println("List Elements:");
		test.front(10);							// insert nodes in front
		test.front(20);
		test.front(30);
		test.back(40);							// insert node in back
		test.display();							// display elements
		
		test.size();							// display amount of elements within list
		boolean result = test.empty();
		System.out.println(result);				// display if list is empty (true/false)
		
		System.out.println();
		System.out.println("Removed Node:");
		test.remove(20);
		test.display();
		test.size();
		
		System.out.println();					
		System.out.println("Second List:");		// new list using insert
		test.insert(list, 20);
		test.insert(list, 100);
		test.insert(list, 75);
		test.printList(list);	
		
		System.out.println();
		System.out.println("Reversed List:");	// 1st list is reversed and displayed
		Node a = new Node(10);
		Node b = new Node(20);
		test.merge(list);						// merge method
		test.reverse();																													
		test.display();
	}

}
