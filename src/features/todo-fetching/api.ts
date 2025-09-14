import { Fetcher } from 'zero-dependency'

const apiClient = new Fetcher('https://jsonplaceholder.typicode.com')

export const postsApi = apiClient.extends('posts')
