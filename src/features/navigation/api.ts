import { Fetcher } from 'zero-dependency'

const api = new Fetcher('https://jsonplaceholder.typicode.com')

export const posts = api.extends('posts')
