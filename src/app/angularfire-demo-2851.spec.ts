import {describe, it, expect, beforeEachProviders, inject} from 'angular2/testing';
import {AngularfireDemo2851App} from '../app/angularfire-demo-2851';

beforeEachProviders(() => [AngularfireDemo2851App]);

describe('App: AngularfireDemo2851', () => {
  it('should have the `defaultMeaning` as 42', inject([AngularfireDemo2851App], (app) => {
    expect(app.defaultMeaning).toBe(42);
  }));

  describe('#meaningOfLife', () => {
    it('should get the meaning of life', inject([AngularfireDemo2851App], (app) => {
      expect(app.meaningOfLife()).toBe('The meaning of life is 42');
      expect(app.meaningOfLife(22)).toBe('The meaning of life is 22');
    }));
  });
});

