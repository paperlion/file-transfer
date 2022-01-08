# react-http-status-code

React HTTP status code allows you to set status codes from react components

## Install
npm install --save react-http-status-code

## Client usage
```javascript
import React from "react";
import { StatusCode } from "react-http-status-code";

// render your component
const MyComponent = () => (
    <StatusCode code={404}>
        <div>
            <p>Sorry, page was not found</p>
        </div>
    </StatusCode>   
);
```

## Server usage
```javascript
import React from "react";
import { renderToString } from "react-dom/server";
import { StatusCode } from "react-http-status-code";

// express middleware
const renderPage = (req, res, next) => {

    const html = renderToString(
        React.createElement(MyRootComponent, props)
    );

    // call this AFTER rendering to string!
    const status = StatusCode.rewind();

    // send the status if one was defined
    if (status) res.status(status);

    res.send(html);
};
```
