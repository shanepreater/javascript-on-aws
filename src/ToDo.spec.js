import React from "react"
import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
import {ToDo} from "./ToDo";

configure({
    adapter: new Adapter()
})

describe("Test ToDo items", () => {
    it("Check open tasks have the right class", () => {
        const wrapper = shallow(<ToDo key="1" name="test task" / >)
        expect(wrapper.hasClass("todo-open")).toBeTruthy()
        expect(wrapper.hasClass("todo-complete")).toBeFalsy()
        expect(wrapper.hasClass("todo-urgent")).toBeFalsy()
    })

    it("Check open urgent tasks have the right classes", () => {
        const wrapper = shallow( <ToDo key="1" name="test task" urgent / >)
        expect(wrapper.hasClass("todo-open")).toBeTruthy()
        expect(wrapper.hasClass("todo-complete")).toBeFalsy()
        expect(wrapper.hasClass("todo-urgent")).toBeTruthy()
    })

    it("Check closed tasks have the right class", () => {
        const wrapper = shallow( <ToDo key="1" name="test task" done/ >)
        expect(wrapper.hasClass("todo-open")).toBeFalsy()
        expect(wrapper.hasClass("todo-complete")).toBeTruthy()
        expect(wrapper.hasClass("todo-urgent")).toBeFalsy()
    })

    it("Check closed urgent tasks have the right classes", () => {
        const wrapper = shallow( <ToDo key="1" name="test task" urgent done / >)
        expect(wrapper.hasClass("todo-open")).toBeFalsy()
        expect(wrapper.hasClass("todo-complete")).toBeTruthy()
        expect(wrapper.hasClass("todo-urgent")).toBeTruthy()
    })
});