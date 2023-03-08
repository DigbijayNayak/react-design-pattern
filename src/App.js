import { CurrentUserLoader } from "./CurrentUserLoader";
import { UserInfo } from "./UserInfo";
import { UserLoader } from "./UserLoader";
import { ResourceLoader } from "./ResourceLoader";
import { ProductInfo } from "./ProductInfo";
import { DataSource } from "./DataSource";
import axios from "axios";
import { RecursiveComponent } from "./RecursiveComponent";
const getServerData = url => async () => {
  const response = await axios.get("/users/123");
  return response.data;
}
const getLocalStorageData = key => () => {
  return localStorage.getItem(key);
}
const Text = ({ message }) => <h1>{message}</h1>;

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
      {/* <DataSource getDataFunc={getServerData('/users/123')} resourceName = 'user'>
        <UserInfo />
      </DataSource>
      <DataSource getDataFunc={getLocalStorageData('message')} resourceName = 'message'>
        <Text />
      </DataSource> */}
      {/* <UserInfo /> */}
      {/* <UserInfo userId="123"/>
      <UserInfo userId="345"/> */}
      <RecursiveComponent data={nestedObject} />
    </>
  );
}

export default App;
