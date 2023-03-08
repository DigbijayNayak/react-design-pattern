# React Design Patterns By Shaun Wassell

# What Are Design Patterns?

### Design Patterns

- Design patterns are effective solutions to common application development challenges.

### A Caveat

- The design patterns we talk about in this course are not the Gang of Four OOP design patterns.
- The patterns we cover here are effective solutions to some extremely common challenges in React.

# Common Challenges

- Creating reusable layouts.
- Reusing complex logic between multiple components.
- Working with forms
- Incorporating functional concepts into our code.

# Layout Components

## Split Screen Components

src>SplitScreen.js

```javascript
import styled from "styled-components"; //npm install styled-components
const Container = styled.div`
  display: flex;
`;
const Pane = styled.div`
  flex: ${(props) => props.weight};
`;
export const SplitScren = ({
  // left: Left,
  // right: Right,
  children,
  leftWeight = 1,
  rightWeight = 1,
}) => {
  const [left, right] = children;
  return (
    <Container>
      <Pane weight={leftWeight}>
        {/* <Left /> */}
        {left}
      </Pane>
      <Pane weight={rightWeight}>
        {/* <Right /> */}
        {right}
      </Pane>
    </Container>
  );
};
```

src>App.js

```Javascript

import { SplitScren } from './SplitScreen';
const LeftHandComponent = ({name}) => {
  return <h1 style={{ backgroundColor: 'green' }}>
    {/* Left! */}
    {name}
  </h1>;
}

const RightHandComponent = ({message}) => {
  return <p style={{ backgroundColor: "red" }}>
    {/* Right! */}
    {message}
  </p>;
}
function App() {
  return (
    // <SplitScren
    //   left={LeftHandComponent}
    //   right={RightHandComponent}
    //   leftWeight={1}
    //   rightWeight={3}
    // />
    <SplitScren
      // left={LeftHandComponent}
      // right={RightHandComponent}
      leftWeight={1}
      rightWeight={3}
    >
      <LeftHandComponent name="Shaun"/>
      <RightHandComponent message="Hello"/>
    </SplitScren>
  );
}

export default App;
```

## Lists and list items

src>people>SmallPersonListItem.js

```Javascript
export const SmallPersonListItem = ({ person }) => {
    const { name, age } = person;
    return (
        <p>Name: {name}, Age: {age} years</p>
    )
}
```

src>people>LargePersonListItem.js

```Javascript
export const LargePersonListItem = ({person}) => {
  const { name, age, hairColor, hobbies } = person;
  return (
    <>
      <h3>{name}</h3>
      <p>Age: {age} years</p>
      <p>Hair Color: {hairColor}</p>
      <h3>Hobbies: </h3>
      <ul>
        {hobbies.map((hobby) => (
          <li key={hobby}>{hobby}</li>
        ))}
      </ul>
    </>
  );
};
```

src>RegularList.js

```Javascript
export const RegularList = ({
    items,
    resourceName,
    itemComponent: ItemCommponent,
 }) => {
    return (
        <>
            {items.map((item, i) => (
                <ItemCommponent key={i} {...{[resourceName]: item}} />
            ))}
        </>
    )
}
```

## Creating different list types

src>products>LargeProductListItem.js

```js
export const LargeProductListItem = ({ product }) => {
  const { name, price, description, rating } = product;
  return (
    <>
      <h3>{name}</h3>
      <p>{price}</p>
      <h3>Description</h3>
      <p>{description}</p>
      <p>Average Rating: {rating}</p>
    </>
  );
};
```

src>products>SmallProductListItem.js

```js
export const SmallProductListItem = ({ product }) => {
  const { name, price } = product;
  return (
    <h3>
      {name} - {price}
    </h3>
  );
};
```

src>NumberedList.js

```js
export const NumberedList = ({
  items,
  resourceName,
  itemComponent: ItemCommponent,
}) => {
  return (
    <>
      {items.map((item, i) => (
        <>
          <h3>{i + 1}</h3>
          <ItemCommponent key={i} {...{ [resourceName]: item }} />
        </>
      ))}
    </>
  );
};
```

src>App.js

```js
import { NumberedList } from "./NumberedList";
import { LargePersonListItem } from "./people/LargePersonListItem";
import { SmallPersonListItem } from "./people/SmallPersonListItem";
import { LargeProductListItem } from "./products/LargeProductListItem";
import { SmallProductListItem } from "./products/SmallProductListItem";
import { RegularList } from "./RegularList";
const people = [
  {
    name: "John Doe",
    age: 54,
    hairColor: "brown",
    hobbies: ["swimming", "bicycling", "video games"],
  },
  {
    name: "Brenda Smith",
    age: 33,
    hairColor: "black",
    hobbies: ["golf", "mathematics"],
  },
  {
    name: "Jane Garcia",
    age: 27,
    hairColor: "blonde",
    hobbies: ["biology", "medicine", "gymnastics"],
  },
];

const products = [
  {
    name: "Flat-Screen TV",
    price: "$300",
    description: "Huge LCD screen, a great deal",
    rating: 4.5,
  },
  {
    name: "Basketball",
    price: "$10",
    description: "Just like the pros use",
    rating: 3.8,
  },
  {
    name: "Running Shoes",
    price: "$120",
    description: "State-of-the-art technology for optimum running",
    rating: 4.2,
  },
];
function App() {
  return (
    <>
      <RegularList
        items={people}
        resourceName="person"
        itemComponent={SmallPersonListItem}
      />
      <NumberedList
        items={people}
        resourceName="person"
        itemComponent={LargePersonListItem}
      />
      <RegularList
        items={products}
        resourceName="product"
        itemComponent={SmallProductListItem}
      />
      <NumberedList
        items={people}
        resourceName="person"
        itemComponent={LargeProductListItem}
      />
    </>
  );
}

export default App;
```

## Modal Components

src>Modal.js

```js
import { useState } from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalBody = styled.div`
  background-color: white;
  margin: 10% auto;
  padding: 20px;
  width: 50%;
`;
export const Modal = ({ children }) => {
  const [shouldShow, setShouldShow] = useState(false);
  return (
    <>
      <button onClick={() => setShouldShow(true)}>Show Modal</button>
      {shouldShow && (
        <ModalBackground onClick={() => setShouldShow(false)}>
          <ModalBody onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShouldShow(false)}>Hide Modal</button>
            {children}
          </ModalBody>
        </ModalBackground>
      )}
    </>
  );
};
```

src>App.js

```js
import { Modal } from "./Modal";
import { LargeProductListItem } from "./products/LargeProductListItem";
const products = [
  {
    name: "Flat-Screen TV",
    price: "$300",
    description: "Huge LCD screen, a great deal",
    rating: 4.5,
  },
  {
    name: "Basketball",
    price: "$10",
    description: "Just like the pros use",
    rating: 3.8,
  },
  {
    name: "Running Shoes",
    price: "$120",
    description: "State-of-the-art technology for optimum running",
    rating: 4.2,
  },
];
function App() {
  return (
    <>
      <Modal>
        <LargeProductListItem product={products[0]} />
      </Modal>
    </>
  );
}

export default App;
```

# Container Components

- Containter components are components that take care of loading and managing data for their child components.
- The Idea of Container Components: Our components shouldn't know where their data is coming from.

### Server Instructions

`npm install axios`  
root>server.js

```js
const express = require("express");

const app = express();

app.use(express.json());

let currentUser = {
  id: "123",
  name: "John Doe",
  age: 54,
  hairColor: "brown",
  hobbies: ["swimming", "bicycling", "video games"],
};

let users = [
  {
    id: "123",
    name: "John Doe",
    age: 54,
    hairColor: "brown",
    hobbies: ["swimming", "bicycling", "video games"],
  },
  {
    id: "234",
    name: "Brenda Smith",
    age: 33,
    hairColor: "black",
    hobbies: ["golf", "mathematics"],
  },
  {
    id: "345",
    name: "Jane Garcia",
    age: 27,
    hairColor: "blonde",
    hobbies: ["biology", "medicine", "gymnastics"],
  },
];

const products = [
  {
    id: "1234",
    name: "Flat-Screen TV",
    price: "$300",
    description: "Huge LCD screen, a great deal",
    rating: 4.5,
  },
  {
    id: "2345",
    name: "Basketball",
    price: "$10",
    description: "Just like the pros use",
    rating: 3.8,
  },
  {
    id: "3456",
    name: "Running Shoes",
    price: "$120",
    description: "State-of-the-art technology for optimum running",
    rating: 4.2,
  },
];

app.get("/current-user", (req, res) => {
  res.json(currentUser);
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;

  res.json(users.find((user) => user.id === id));
});

app.post("/users/:id", (req, res) => {
  const { id } = req.params;
  const { user: updatedUser } = req.body;

  users = users.map((user) => (user.id === id ? updatedUser : user));

  res.json(users.find((user) => user.id === id));
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;

  res.json(products.find((product) => product.id === id));
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.listen(8081, () => {
  console.log("Server is listening on port 8081");
});
```

- To run server use `node server.js`
- Establish connection between the frontend and backend add the below instruction in the `package.json` file.

```js
"proxy": "http://localhost:8081"
```

src>UserInfo.js

```js
export const UserInfo = ({ user }) => {
  const { name, age, hairColor, hobbies } = user || {};
  return user ? (
    <>
      <h3>{name}</h3>
      <p>Age: {age} years</p>
      <p>Hair Color: {hairColor}</p>
      <h3>Hobbies: </h3>
      <ul>
        {hobbies.map((hobby) => (
          <li key={hobby}>{hobby}</li>
        ))}
      </ul>
    </>
  ) : (
    <p>Loading...</p>
  );
};
```

src>ProductInfo.js

```js
export const ProductInfo = ({ product }) => {
  const { name, price, description, rating } = product || {};
  return product ? (
    <>
      <h3>{name}</h3>
      <p>{price}</p>
      <h3>Description</h3>
      <p>{description}</p>
      <p>Average Rating: {rating}</p>
    </>
  ) : (
    <p>Loading...</p>
  );
};
```

src>CurrentUserLoader.js

```js
import React, { useState, useEffect } from "react";
import axios from "axios";
export const CurrentUserLoader = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await axios.get("/current-user");
      setUser(response.data);
      console.log(response.data);
    })();
  }, []);
  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { user });
        }
        return child;
      })}
    </>
  );
};
```

src>UserLoader.js

```js
import React, { useState, useEffect } from "react";
import axios from "axios";
export const UserLoader = ({ userId, children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await axios.get(`/users/${userId}`);
      setUser(response.data);
      console.log(response.data);
    })();
  }, [userId]);
  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { user });
        }
        return child;
      })}
    </>
  );
};
```

src>ResourceLoader.js

```js
import React, { useState, useEffect } from "react";
import axios from "axios";
export const ResourceLoader = ({ resourceUrl, resourceName, children }) => {
  const [state, setState] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await axios.get(resourceUrl);
      setState(response.data);
      console.log(response.data);
    })();
  }, [resourceUrl]);
  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { [resourceName]: state });
        }
        return child;
      })}
    </>
  );
};
```

### Another Ways resource loaders and Loading data from localStorage

src>DataSource.js

```js
import React, { useState, useEffect } from "react";
export const DataSource = ({
  getDataFunc = () => {},
  resourceName,
  children,
}) => {
  const [state, setState] = useState(null);
  useEffect(() => {
    (async () => {
      const data = await getDataFunc();
      setState(data);
    })();
  }, [getDataFunc]);
  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { [resourceName]: state });
        }
        return child;
      })}
    </>
  );
};
```

src>App.js

```js
import { CurrentUserLoader } from "./CurrentUserLoader";
import { UserInfo } from "./UserInfo";
import { UserLoader } from "./UserLoader";
import { ResourceLoader } from "./ResourceLoader";
import { ProductInfo } from "./ProductInfo";
import { DataSource } from "./DataSource";
import axios from "axios";
const getServerData = (url) => async () => {
  const response = await axios.get("/users/123");
  return response.data;
};
const getLocalStorageData = (key) => () => {
  return localStorage.getItem(key);
};
const Text = ({ message }) => <h1>{message}</h1>;
function App() {
  return (
    <>
      {/* <CurrentUserLoader> */}
      {/* <UserLoader userId="123">
        <UserInfo />
      </UserLoader>
      <UserLoader userId="234">
        <UserInfo />
      </UserLoader>
      <UserLoader userId="345">
        <UserInfo />
      </UserLoader> */}
      {/* </CurrentUserLoader> */}
      {/* <ResourceLoader resourceUrl="users/123" resourceName="user">
        <UserInfo />
      </ResourceLoader>
      <ResourceLoader resourceUrl="products/1234" resourceName="product">
        <ProductInfo />
      </ResourceLoader> */}
      {/* <DataSource getDataFunc={async () => {
        const response = await axios.get('/users/123');
        return response.data;
      }} resourceName = 'user'> */}
      <DataSource getDataFunc={getServerData("/users/123")} resourceName="user">
        <UserInfo />
      </DataSource>
      <DataSource
        getDataFunc={getLocalStorageData("message")}
        resourceName="message"
      >
        <Text />
      </DataSource>
    </>
  );
}

export default App;
```

# Controlled vs Uncontrolled Components

# Uncontrolled Component

- Components that keep track of their own state and release data only when some event occurs (that is, the submit event for HTML forms)

```js
const MyComponent = ({onSubmit}) => {
    const [someState, setState] = useState(...);
    return ...;
}
<MyComponent onSubmit={data => ...} />
```

# Controlled Component

- Components that do not keep track of their own state ---all state is passed in as props(that is, when we use the useState Hook with text inputs)

```js
const MyComponent = ({data, changeData, onSubmit}) => {
    return ...;
}
<MyComponent
    data = {...}
    changeData = {() => ...}
    onSubmit={data => ...} />
```

src>App.js

```js
import { ControlledForm } from "./ControlledForm";
import "./styles.css";
import { UncontrolledForm } from "./UncontrolledForm";

export default function App() {
  return (
    <>
      {/* <UncontrolledForm /> */}
      <ControlledForm />
    </>
  );
}
```

src>UncontrolledForm.js

```js
import React from "react";
export const UncontrolledForm = () => {
  const nameInput = React.createRef();
  const ageInput = React.createRef();
  const hairColorInput = React.createRef();
  const handleSubmit = (e) => {
    console.log(nameInput.current.value);
    console.log(ageInput.current.value);
    console.log(hairColorInput.current.value);
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" type="text" placeholder="Name" ref={nameInput} />
      <input name="age" type="number" placeholder="Age" ref={ageInput} />
      <input
        name="hairColor"
        type="text"
        placeholder="Hair Color"
        ref={hairColorInput}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};
```

src>ControlledForm.js

```js
import { useEffect, useState } from "react";
export const ControlledForm = () => {
  const [nameInputError, setNameInputError] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [hairColor, setHairColor] = useState();
  useEffect(() => {
    if (name.length < 2) {
      setNameInputError("Name must be two or more character");
    } else {
      setNameInputError("");
    }
  }, [name]);
  return (
    <form>
      {nameInputError && <p>{nameInputError}</p>}
      <input
        name="name"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        name="age"
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(Number(e.target.value))}
      />
      <input
        name="hairColor"
        type="text"
        placeholder="Hair Color"
        value={hairColor}
        onChange={(e) => setHairColor(e.target.value)}
      />
      <button>Submit</button>
    </form>
  );
};
```

## Uncontrolled onboarding flows

- onboarding the process step by step
  src>UncontrolledonboardingFlows.js

```js
import React, { useState } from "react";
export const UncontrolledOnboardingFlow = ({ children, onFinish }) => {
  const [onboardingData, setOnboardingData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToNext = () => {
    setCurrentIndex(currentIndex + 1);
  };
  const currentChild = React.Children.toArray(children)[currentIndex];
  if (React.isValidElement(currentChild)) {
    return React.cloneElement(currentChild, { goToNext });
  }
  return currentChild;
};
```

src>App.js

```js
import { ControlledForm } from "./ControlledForm";
import "./styles.css";
import { UncontrolledForm } from "./UncontrolledForm";
import { UncontrolledOnboardingFlow } from "./UncontrolledOnboardingFlow";
const Step1 = ({ goToNext }) => {
  return (
    <>
      <p>Step 1</p>
      <button onClick={goToNext}>next</button>
    </>
  );
};
const Step2 = ({ goToNext }) => {
  return (
    <>
      <p>Step 2</p>
      <button onClick={goToNext}>next</button>
    </>
  );
};
const Step3 = ({ goToNext }) => {
  return (
    <>
      <p>Step 3</p>
      <button onClick={goToNext}>next</button>
    </>
  );
};
export default function App() {
  return (
    <>
      {/* <UncontrolledForm /> */}
      {/* <ControlledForm /> */}
      <UncontrolledOnboardingFlow>
        <Step1 />
        <Step2 />
        <Step3 />
      </UncontrolledOnboardingFlow>
    </>
  );
}
```

## Collecting onboarding data

src>UncontrolledonboardingFlow.js

```js
import React, { useState } from "react";
export const UncontrolledOnboardingFlow = ({ children, onFinish }) => {
  const [onboardingData, setOnboardingData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToNext = (stepData) => {
    const nextIndex = currentIndex + 1;
    const updateData = {
      ...onboardingData,
      ...stepData,
    };
    console.log(updateData);
    if (nextIndex < children.length) {
      setCurrentIndex(nextIndex);
    } else {
      onFinish(updateData);
    }
    // setCurrentIndex(currentIndex + 1);
    setOnboardingData(updateData);
  };
  const currentChild = React.Children.toArray(children)[currentIndex];
  if (React.isValidElement(currentChild)) {
    return React.cloneElement(currentChild, { goToNext });
  }
  return currentChild;
};
```

src>App.js

```js
import { ControlledForm } from "./ControlledForm";
import "./styles.css";
import { UncontrolledForm } from "./UncontrolledForm";
import { UncontrolledOnboardingFlow } from "./UncontrolledOnboardingFlow";
const Step1 = ({ goToNext }) => {
  return (
    <>
      <p>Step 1</p>
      <button onClick={() => goToNext({ name: "John Doe" })}>next</button>
    </>
  );
};
const Step2 = ({ goToNext }) => {
  return (
    <>
      <p>Step 2</p>
      <button onClick={() => goToNext({ age: 100 })}>next</button>
    </>
  );
};
const Step3 = ({ goToNext }) => {
  return (
    <>
      <p>Step 3</p>
      <button onClick={() => goToNext({ hairColor: "brown" })}>next</button>
    </>
  );
};
export default function App() {
  return (
    <>
      {/* <UncontrolledForm /> */}
      {/* <ControlledForm /> */}
      <UncontrolledOnboardingFlow
        onFinish={(data) => {
          console.log(data);
          alert("Onboarding Complete");
        }}
      >
        <Step1 />
        <Step2 />
        <Step3 />
      </UncontrolledOnboardingFlow>
    </>
  );
}
```

## Controlled onboarding flows

- Gives much more flexibility to write the validation and perform logical activity.
- It ensures the steps are in proper order, tracks data, and is an easy way to reset the onboarding process.
  -Some benefits of using a controlled onboarding flow include:

1. Ensuring that all steps in the onboarding process are completed in the correct order
2. Allowing you to track the data collected from the user at each step and
3. Providing an easy way to reset the onboarding process if necessary.

src>ControlledOnboardingFlow.js

```js
import React from "react";
export const ControlledOnboardingFlow = ({
  children,
  onFinish,
  currentIndex,
  onNext,
}) => {
  const goToNext = (stepData) => {
    onNext(stepData);
  };
  const currentChild = React.Children.toArray(children)[currentIndex];
  if (React.isValidElement(currentChild)) {
    return React.cloneElement(currentChild, { goToNext });
  }
  return currentChild;
};
```

src>App.js

```js
import { useState } from "react";
import { ControlledForm } from "./ControlledForm";
import { ControlledOnboardingFlow } from "./ControlledOnboardingFlow";
import "./styles.css";
import { UncontrolledForm } from "./UncontrolledForm";
import { UncontrolledOnboardingFlow } from "./UncontrolledOnboardingFlow";
const Step1 = ({ goToNext }) => {
  return (
    <>
      <p>Step 1</p>
      <button onClick={() => goToNext({ name: "John Doe" })}>next</button>
    </>
  );
};
const Step2 = ({ goToNext }) => {
  return (
    <>
      <p>Step 2</p>
      <button onClick={() => goToNext({ age: 100 })}>next</button>
    </>
  );
};
const Step3 = ({ goToNext }) => {
  return (
    <>
      <p>Step 3</p>
      <p>Congratulations! You qualify for our senior discount</p>
      <button onClick={() => goToNext({})}>next</button>
    </>
  );
};
const Step4 = ({ goToNext }) => {
  return (
    <>
      <p>Step 4</p>
      <button onClick={() => goToNext({ hairColor: "brown" })}>next</button>
    </>
  );
};
export default function App() {
  const [onboardingData, setOnboardingData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const onNext = (stepData) => {
    setOnboardingData({ ...onboardingData, ...stepData });
    setCurrentIndex(currentIndex + 1);
  };
  return (
    <>
      {/* <UncontrolledForm /> */}
      {/* <ControlledForm /> */}
      {/* <UncontrolledOnboardingFlow onFinish={data => {
        console.log(data);
        alert('Onboarding Complete');
      }}>
        <Step1 />
        <Step2 />
        <Step3 />
      </UncontrolledOnboardingFlow> */}
      <ControlledOnboardingFlow currentIndex={currentIndex} onNext={onNext}>
        <Step1 />
        <Step2 />
        {onboardingData.age >= 62 && <Step3 />}
        <Step4 />
      </ControlledOnboardingFlow>
    </>
  );
}
```

What is the main difference between a controlled and uncontrolled onboarding flow?

- A controlled onboarding flow allows the app component to have more control over what is displayed, while an uncontrolled onboarding flow does not.

What are the differences between a controlled and uncontrolled form in React?

- A controlled form keeps track of values for each input using a useState hook, while an uncontrolled form does not. Additionally, each input in a controlled form has an onChange handler that updates the corresponding state variable when the user changes the value in the input.
  What is the main difference between controlled and uncontrolled components?
- Uncontrolled components are those where the component itself keeps track of its own internal state, while controlled components are those where the state is passed through as props from a parent component. Controlled components tend to be more reusable and easier to test.

# Higher-Order Component

- A component that returns another component instead of JSX.

MyComponent ------> `<h1>I'm JSX!</h1>`
HOC ------> SomeComonent ------> `<h1>I'm JSX!</h1>`

#### HOCs are Used for...

- Sharing complex behavior between multiple components (much like with container components)
- Adding extra functionality to existing components.

## Printing props with HOCs

root>server.js  
src>UserInfo.js  
src>printProps.js

```js
export const printProps = (Component) => {
  return (props) => {
    console.log(props);
    return <Component {...props} />;
  };
};
```

src>App.js

```js
import { printProps } from "./printProps";
import { UserInfo } from "./UserInfo";
const UserInfoWrapped = printProps(UserInfo);
function App() {
  return <UserInfoWrapped a={1} b="Hello" c={{ name: "Shaun" }} />;
}
export default App;
```

## Loading data with HOCs

root>server.js
src>UserInfo.js
src>withUser.js

```js
import React, { useState, useEffect } from "react";
import axios from "axios";
export const withUser = (Component, userId) => {
  return (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      (async () => {
        const response = await axios.get(`/users/${userId}`);
        setUser(response.data);
      })();
    });
    return <Component {...props} user={user} />;
  };
};
```

src>App.js

```js
import { printProps } from "./printProps";
import { UserInfo } from "./UserInfo";
import { withUser } from "./withUser";

const UserInfoWithLoader = withUser(UserInfo, "234");

function App() {
  return <UserInfoWithLoader />;
}

export default App;
```

## Modifying data with HOCs

root>server.js  
src>UserInfo.js  
src>App.js

```js
import { printProps } from "./printProps";
import { UserInfo } from "./UserInfo";
import { withUser } from "./withUser";
import { UserInfoForm } from "./UserInfoForm";

const UserInfoWithLoader = withUser(UserInfo, "234");

function App() {
  return <UserInfoForm />;
}

export default App;
```

src>withUser.js

```js
import React, { useState, useEffect } from "react";
import axios from "axios";

export const withUser = (Component, userId) => {
  return (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      (async () => {
        const response = await axios.get(`/users/${userId}`);
        setUser(response.data);
      })();
    }, []);

    return <Component {...props} user={user} />;
  };
};
```

src>UserInfoForm.js

```js
import { withEditableUser } from "./withEditableUser";

export const UserInfoForm = withEditableUser(
  ({ user, onChangeUser, onSaveUser, onResetUser }) => {
    const { name, age, hairColor } = user || {};

    return user ? (
      <>
        <label>
          Name:
          <input
            value={name}
            onChange={(e) => onChangeUser({ name: e.target.value })}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => onChangeUser({ age: Number(e.target.value) })}
          />
        </label>
        <label>
          Hair Color:
          <input
            value={hairColor}
            onChange={(e) => onChangeUser({ hairColor: e.target.value })}
          />
        </label>
        <button onClick={onResetUser}>Reset</button>
        <button onClick={onSaveUser}>Save Changes</button>
      </>
    ) : (
      <p>Loading...</p>
    );
  },
  "123"
);
```

src>withEditableUser.js

```js
import React, { useState, useEffect } from "react";
import axios from "axios";

export const withEditableUser = (Component, userId) => {
  return (props) => {
    const [originalUser, setOriginalUser] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
      (async () => {
        const response = await axios.get(`/users/${userId}`);
        setOriginalUser(response.data);
        setUser(response.data);
      })();
    }, []);

    const onChangeUser = (changes) => {
      setUser({ ...user, ...changes });
    };

    const onSaveUser = async () => {
      const response = await axios.post(`/users/${userId}`, { user });
      setOriginalUser(response.data);
      setUser(response.data);
    };

    const onResetUser = () => {
      setUser(originalUser);
    };

    return (
      <Component
        {...props}
        user={user}
        onChangeUser={onChangeUser}
        onSaveUser={onSaveUser}
        onResetUser={onResetUser}
      />
    );
  };
};
```

## HOCs improvement

src>UserInfoForm.js

```js
import { withEditableResource } from "./withEditableResource";

export const UserInfoForm = withEditableResource(
  ({ user, onChangeUser, onSaveUser, onResetUser }) => {
    const { name, age, hairColor } = user || {};

    return user ? (
      <>
        <label>
          Name:
          <input
            value={name}
            onChange={(e) => onChangeUser({ name: e.target.value })}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => onChangeUser({ age: Number(e.target.value) })}
          />
        </label>
        <label>
          Hair Color:
          <input
            value={hairColor}
            onChange={(e) => onChangeUser({ hairColor: e.target.value })}
          />
        </label>
        <button onClick={onResetUser}>Reset</button>
        <button onClick={onSaveUser}>Save Changes</button>
      </>
    ) : (
      <p>Loading...</p>
    );
  },
  "/users/123",
  "user"
);
```

src>withEditableResource.js

```js
import React, { useState, useEffect } from "react";
import axios from "axios";

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const withEditableResource = (Component, resourcePath, resourceName) => {
  return (props) => {
    const [originalData, setOriginalData] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
      (async () => {
        const response = await axios.get(resourcePath);
        setOriginalData(response.data);
        setData(response.data);
      })();
    }, []);

    const onChange = (changes) => {
      setData({ ...data, ...changes });
    };

    const onSave = async () => {
      const response = await axios.post(resourcePath, { [resourceName]: data });
      setOriginalData(response.data);
      setData(response.data);
    };

    const onReset = () => {
      setData(originalData);
    };

    const resourceProps = {
      [resourceName]: data,
      [`onChange${capitalize(resourceName)}`]: onChange,
      [`onSave${capitalize(resourceName)}`]: onSave,
      [`onReset${capitalize(resourceName)}`]: onReset,
    };

    return <Component {...props} {...resourceProps} />;
  };
};
```

# Custom Hooks Patterns

## What are custom Hooks?

- Special hooks that we define ourselves, and that usually combine the functionlity of one or more existing React hooks like "useState" or "useEffect"

# Functional Programming and React

## What is functional programming?

- A method of organizing code in a way that:

1.  Minimizes mutation and state change
2.  Keeps functions independent of external data
3.  Treats functions as first-class citizens

## Applications of FP in React

- Controlled components
- Function components
- Higher-order components
- Recursive components
- Partially applied components
- Component composition

## Recursive Components

src>App.js

```js
import { RecursiveComponent } from "./RecursiveComponent";

const nestedObject = {
  a: 1,
  b: {
    b1: 4,
    b2: {
      b23: "Hello",
    },
    b3: {
      b31: {
        message: "Hi",
      },
      b32: {
        message: "Hi",
      },
    },
  },
  c: {
    c1: 2,
    c2: 3,
  },
};

function App() {
  return <RecursiveComponent data={nestedObject} />;
}

export default App;
```

src>RecursiveComponent.js

```js
const isObject = (x) => typeof x === "object" && x !== null;

export const RecursiveComponent = ({ data }) => {
  if (!isObject(data)) {
    return <li>{data}</li>;
  }

  const pairs = Object.entries(data);

  return (
    <>
      {pairs.map(([key, value]) => (
        <li>
          {key}:
          <ul>
            <RecursiveComponent data={value} />
          </ul>
        </li>
      ))}
    </>
  );
};
```

## Component Composition

- Composition allows you to create different versions of a component by creating new components that use the original component. For example, you can create a danger button that automatically has the color set to red, or a big success button with the padding set to large and the color set to green. This allows you to avoid code duplication and makes a code more maintainable.
  src/composition.js

```js
export const Button = ({ size, color, text, ...props }) => {
  return (
    <button
      style={{
        padding: size === "large" ? "32px" : "8px",
        fontSize: size === "large" ? "32px" : "16px",
        backgroundColor: color,
      }}
      {...props}
    >
      {text}
    </button>
  );
};

export const DangerButton = (props) => {
  return <Button {...props} color="red" />;
};

export const BigSuccessButton = (props) => {
  return <Button {...props} size="large" color="green" />;
};
```

src/App.js

```js
import { RecursiveComponent } from "./RecursiveComponent";
import { DangerButton, BigSuccessButton } from "./composition";
function App() {
  return (
    <>
      <DangerButton text="Don't do it!" />
      <BigSuccessButton text="Yes!!!" />
    </>
  );
}

export default App;
```

## Partially applied components

src/composition.js

```js
export const Button = ({ size, color, text, ...props }) => {
  return (
    <button
      style={{
        padding: size === "large" ? "32px" : "8px",
        fontSize: size === "large" ? "32px" : "16px",
        backgroundColor: color,
      }}
      {...props}
    >
      {text}
    </button>
  );
};

export const DangerButton = (props) => {
  return <Button {...props} color="red" />;
};

export const BigSuccessButton = (props) => {
  return <Button {...props} size="large" color="green" />;
};
```

src/App.js

```js
import { DangerButton, BigSuccessButton } from "./partiallyApply";

function App() {
  return (
    <>
      <DangerButton text="Don't do it!" />
      <BigSuccessButton text="Yes!!!" />
    </>
  );
}

export default App;
```

## Installing


1. To use these exercise files, you must have the following installed:
   - [list of requirements for course]
2. Clone this repository into your local machine using the terminal (Mac), CMD (Windows), or a GUI tool like SourceTree.
3. [Course-specific instructions]
4. [Exercise Files in Github](https://github.com/LinkedInLearning/react-design-patterns-2895130)
### Instructor

Shaun Wassell
