import React from 'react';
import axios from 'axios';

export const loadOptionConverter = async input => {
  const requestUrl = `v1/converters?textSearch=${input}`;
  const result = await axios.get(requestUrl);
  return result.data;
};

export const loadOptionInterviewer = async input => {
  const requestUrl = `v1/interviewers?textSearch=${input}`;
  const result = await axios.get(requestUrl);
  return result.data;
};

export const loadOptionMaster = async input => {
  const requestUrl = `v1/interviewCenters?textSearch=${input}`;
  const result = await axios.get(requestUrl);
  return result.data;
};

export const loadOptionExpectRank = async input => {
  const requestUrl = `v1/ranks?textSearch=${input}`;
  const result = await axios.get(requestUrl);
  return result.data;
};

export const loadOptionMajor = async (input, roundId) => {
  const requestUrl = `v1/interviewSkills/rounds/${roundId}?textSearch=${input}`;
  const result = await axios.get(requestUrl);
  return result.data;
};

export const loadOptionRank = async input => {
  const requestUrl = `v1/fields?textSearch=${input}`;
  const result = await axios.get(requestUrl);
  return result.data;
};

export const loadOptionProduct = async input => {
  const requestUrl = `v1/interviewProducts?textSearch=${input}`;
  const result = await axios.get(requestUrl);
  return result.data;
};

export const loadOptionProgram = async input => {
  const requestUrl = `v1/interviewPrograms?textSearch=${input}`;
  const result = await axios.get(requestUrl);
  return result.data;
};

export const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
