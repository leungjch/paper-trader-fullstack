import React, { useState, useEffect, useContext } from "react";
import { Button, ButtonGroup, Form, Table } from 'react-bootstrap';
import { UserContext, UserProvider } from '../UserContext';
import Tesla from './TSLA.js'
import cleanStockData from "../helper-functions/cleanStockData"
