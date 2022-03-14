package project2;

import java.util.List;

import org.w3c.dom.Node;

public class MyList<T extends Comparable<T>>
{
	Node head;
	List<T> myList;
	
	// Node Class
	public class Node
	{
		T data;
		Node next;
		
		Node(T val)
		{
			this.data = val;
			next = null;
		}
	}
	
	void front(T val)
	{
		Node newNode = new Node(val); // builds node
		newNode.next = head;			  // sets next node to null
		head = newNode; 				  // sets beginning to the newly created node
	}
	
	void back(T val)
	{
		Node newNode = new Node(val); 			// builds node
		Node temp = head; 							// builds temporary node
		
		newNode.data = val; 					// adds data member to new node
		while (temp.next != null)
		{
			temp = temp.next; 						// goes to the end of the list
		}
		temp.next = newNode;						// next nodes set as the new node
	}
	
	void insertPos(int pos, T val)
	{
		Node newNode = new Node(val);   // builds node
		Node temp = head;					// sets temporary node to null
		Node previous = new Node(val);  // builds previous node
		int position = pos;                 // initiates where the loop will stop
		newNode.data = val;				//initiates new node's data to input data
		
		for (int i = 1; i < position; i++)
		{
			previous = temp; 				// swaps positions so we can access the pointers
			temp = temp.next; 				// moves the temporary node
		}
		previous.next = newNode; 			// sets data into the list
		newNode.next = temp; 				// points to the next node
	}
	
	void pop_front(T val)
	{
		Node temp = head;							// sets temp to null
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
	}
	
	public MyList insert(MyList list, T val)
	{
		Node newNode = new Node(val); // create a new node with int data
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
	
	public void printList(MyList list)
	{
		Node currNode = list.head; 					// creates new node as a current node
		while (currNode != null) 					// goes through the linked list
		{
			System.out.println(currNode.data + ""); // prints the data at the current node
			currNode = currNode.next; 				// goes to the next node
		}
	}
	
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
	
//	Node merge(Node a, Node b)
//	{
//		if (a == null)
//		{
//			return b;
//		}
//		if (b == null)
//		{
//			return a;
//		}
//		if (a.data < b.data)
//		{
//			a.next = merge(a.next, b);
//			return a;
//		}
//		else
//		{
//			b.next = merge(a, b.next);
//			return b;
//		}
//	}

	public static void main(String[] args) 
	{
		// ...
		MyList test = new MyList();
		MyList list = new MyList(); // create list
		test.front(10);
//		test.insertFront(20);
//		test.insertFront(30);
//		test.insertFront(40);
//		test.insertEnd(50);
		test.display();
		
		test.insert(list, 20);
		test.insert(list, 30);
		test.printList(list);
	}

}
