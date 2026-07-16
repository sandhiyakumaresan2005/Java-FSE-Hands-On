import React, { Component } from 'react';
import Post from './Post';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
      error: null,
    };
  }

  loadPosts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data = await response.json();
      const posts = data.map((item) => {
        const professionalTitle = 'Understanding React Component Lifecycle';
        const professionalBody = `React is one of the most popular JavaScript libraries for building modern and interactive user interfaces. One of the key concepts in React, especially when working with class components, is the Component Lifecycle. The component lifecycle refers to the series of phases that a React component goes through from the moment it is created until it is removed from the application. Understanding these lifecycle methods helps developers manage data loading, update the user interface efficiently, and handle unexpected errors gracefully.

The lifecycle of a React component is divided into three main phases: Mounting, Updating, and Unmounting. During the Mounting phase, the component is created and inserted into the Document Object Model (DOM). This is the stage where developers often initialize the component, set its initial state, and perform operations such as fetching data from a server. One of the most commonly used lifecycle methods during this phase is componentDidMount(). This method is automatically called immediately after the component is successfully rendered on the screen. It is the ideal place to make API calls, retrieve data from databases, or perform any asynchronous operations because the component is already available in the DOM.

For example, in a blog application, the componentDidMount() method can be used to fetch blog posts from an online API. Once the data is received, it is stored in the component's state, causing React to automatically update the user interface and display the latest blog posts. This approach improves the user experience because the application remains responsive while the data is being loaded in the background.

The second phase of the lifecycle is the Updating phase. This phase occurs whenever a component's state or properties (props) change. React automatically re-renders the component whenever new data is received or existing data is modified. During this phase, lifecycle methods allow developers to control how updates should be handled and optimize performance by preventing unnecessary re-rendering. Although function components now use React Hooks such as useEffect() for similar behavior, understanding lifecycle methods in class components remains important because many existing applications still rely on them.

The final phase is the Unmounting phase. This occurs when a component is removed from the DOM. Before the component is destroyed, React provides an opportunity to clean up resources such as timers, event listeners, or network subscriptions. Proper cleanup helps prevent memory leaks and improves application performance. In class components, this cleanup is typically handled using the componentWillUnmount() lifecycle method.

Another important lifecycle method is componentDidCatch(), which is used for error handling. Sometimes an application may encounter unexpected runtime errors while rendering components. Without proper error handling, these errors can cause the entire application to crash, leading to a poor user experience. The componentDidCatch() method acts as an Error Boundary, allowing developers to catch rendering errors, log them for debugging, and display a user-friendly error message instead of a blank or broken page. This makes React applications more robust and reliable.

The component lifecycle offers several important benefits. It provides a structured approach for managing component behavior, simplifies data fetching, improves application performance, supports efficient state management, and enables graceful error handling. Lifecycle methods also make it easier to separate different responsibilities within a component, resulting in cleaner and more maintainable code. Developers can precisely control when specific actions should occur, such as loading data after rendering or handling exceptions without affecting the rest of the application.

Although modern React applications often use functional components with Hooks, lifecycle methods remain an essential concept because Hooks are designed to achieve similar functionality. Understanding how lifecycle methods work helps developers better understand React's rendering process and makes it easier to work with both older and newer React projects.

In conclusion, the React Component Lifecycle is a fundamental concept that every React developer should understand. Lifecycle methods such as componentDidMount() and componentDidCatch() allow developers to fetch data, manage updates, handle errors, and improve application performance. By using these methods effectively, developers can build scalable, efficient, and user-friendly web applications that provide a smooth experience for users while maintaining clean and organized code.`;

        return new Post(item.userId, item.id, professionalTitle, professionalBody);
      });
      this.setState({ posts, loading: false, error: null });
    } catch (error) {
      this.setState({ loading: false, error: error.message });
      console.error(error);
    }
  };

  componentDidMount() {
    this.loadPosts();
  }

  componentDidCatch(error, info) {
    this.setState({ error: error.message });
    console.error('Error caught:', error, info);
    alert(error.message);
  }

  render() {
    const { posts, loading, error } = this.state;

    if (error) {
      return React.createElement('div', null, 'Error: ', error);
    }

    if (loading) {
      return React.createElement('div', null, 'Loading Posts...');
    }

    return React.createElement(
      'div',
      { style: { padding: '20px', maxWidth: '800px', margin: '0 auto' } },
      React.createElement('h1', null, 'Blog Posts'),
      posts.map((post) =>
        React.createElement(
          'div',
          { key: post.id, style: { marginBottom: '20px' } },
          React.createElement('h2', null, post.title),
          React.createElement('p', null, post.body),
          React.createElement('hr', null)
        )
      )
    );
  }
}

export default Posts;
