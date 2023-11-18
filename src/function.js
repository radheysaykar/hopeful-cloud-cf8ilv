import React, { Component, useState, useEffect} from "react";

export function AssertionComponent(condition, errorMessage) {
  if (!condition) {
    alert(errorMessage);
    throw new Error(errorMessage);
    localStorage.removeItem('username');
    window.location = "/"
  }
}