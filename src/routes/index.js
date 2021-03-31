import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Table from '../Pages/Table';

export default function Routers() {
  return (
    <Switch>
      <Route path="/"><Table /></Route>
    </Switch>
  );
}
