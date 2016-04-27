'use strict';

describe('Config Service', function() {
    // Variables
    var $httpBackend, request;

    // Injections
    beforeEach(inject(function($injector, $http) {
        // Set up the mock http service responses
        $httpBackend = $injector.get('$httpBackend');

        // Reset request response
        request = {};
        /* Http request */
        $http.get('http://localhost')
            .success(function(data, status, headers, config) {
                request.valid = true;
                request.response = data;
            })
            .error(function(data, status, headers, config) {
                request.valid = false;
        });
    }));


    // Tests
    it('Should load config JSON', function() {
        $httpBackend
        .when('GET', 'http://localhost')
        .respond(200, { data: '123' });

        $httpBackend.flush();

        expect(request.valid).toBe(true);
        expect(request.response).toEqual({ data: '123' });
    });
});