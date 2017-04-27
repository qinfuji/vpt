import { observable, toJS } from 'mobx';
import { Container } from './Container';
import { Component } from './Component';

export class Panel extends Container {

    /**
     * 标题
     */
    title: string;
}