import React from "react"
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';

import {ToDoForm} from "./ToDoForm"

configure({
    adapter: new Adapter()
})

describe("Test the ToDo form", () => {
    it("Test the snapshot matches", () => {
        const wrapper = shallow(<ToDoForm />)
        expect(wrapper.snapshot).toMatchSnapshot()
    })
})