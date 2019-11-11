const chai = require('chai')
const chaiHttp = require('chai-http');
const app = require('../app');
const clearDatabase = require('../helpers/clearDatabase');

chai.use(chaiHttp);
let expect = chai.expect;
let userTest = {};
before(function (done) {
    this.timeout(1000000)
    console.log("before in user test")
    clearDatabase(done);
});

describe('users', function () {
    describe('post data', function () {
        it('post data without error', function (done) {
            chai.request(app)
                .post('/users')
                .send({
                    name: 'test',
                    email: 'test@gmail.com'
                })
                .end(function (err, res) {
                    userTest = res.body;
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('email');
                    expect(res.body).to.have.property('status');
                    expect(res.body.name).to.equal('test');
                    expect(res.body.email).to.equal('test@gmail.com');
                    expect(res.body.status).to.equal(true);
                    expect(res).to.have.status(200);
                    done();
                })
        })

        it('post data with error validation', function (done) {
            chai.request(app)
                .post('/users')
                .send()
                .end(function (err, res) {
                    expect(res.body).to.have.property('message');
                    expect(res.body).to.have.property('status');
                    expect(res.body.message).to.equal('Name cannot be empty, Email cannot be empty');
                    expect(res.body.status).to.equal(false);
                    expect(res).to.have.status(400);
                    done();
                })
        })

        it('post data with error validation empty name and email been used', function (done) {
            chai.request(app)
                .post('/users')
                .send({
                    email: 'test@gmail.com'
                })
                .end(function (err, res) {
                    expect(res.body).to.have.property('message');
                    expect(res.body).to.have.property('status');
                    expect(res.body).to.have.property('email');
                    expect(res.body.message).to.equal('Name cannot be empty, Email has already been used');
                    expect(res.body.status).to.equal(false);
                    expect(res.body.email).to.equal('test@gmail.com');
                    expect(res).to.have.status(400);
                    done();
                })
        })

        it('post data with error validation empty email', function (done) {
            chai.request(app)
                .post('/users')
                .send({
                    name: 'test'
                })
                .end(function (err, res) {
                    expect(res.body).to.have.property('message');
                    expect(res.body).to.have.property('status');
                    expect(res.body.message).to.equal('Email cannot be empty');
                    expect(res.body.status).to.equal(false);
                    expect(res).to.have.status(400);
                    done();
                })
        })

        it('post data with error validation email been used', function (done) {
            chai.request(app)
                .post('/users')
                .send({
                    email: 'test@gmail.com',
                    name: 'test'
                })
                .end(function (err, res) {
                    expect(res.body).to.have.property('email');
                    expect(res.body).to.have.property('status');
                    expect(res.body.message).to.equal('Email has already been used');
                    expect(res.body.email).to.equal('test@gmail.com');
                    expect(res.body.status).to.equal(false);
                    expect(res).to.have.status(409);
                    done();
                })
        })

        it('post data with error validation email format is invalid', function (done) {
            chai.request(app)
                .post('/users')
                .send({
                    email: 'test @gmail.com',
                    name: 'test'
                })
                .end(function (err, res) {
                    expect(res.body).to.have.property('email');
                    expect(res.body).to.have.property('status');
                    expect(res.body.message).to.equal('Is invalid');
                    expect(res.body.email).to.equal('test @gmail.com');
                    expect(res.body.status).to.equal(false);
                    expect(res).to.have.status(400);
                    done();
                })
        })
    })

    describe('read all', function () {
        it('should read all data in database', function (done) {
            chai.request(app)
                .get('/users')
                .send()
                .end(function (err, res) {
                    expect(res.body).to.have.be.an('Array');
                    expect(res.body[0]).to.have.property('_id');
                    expect(res.body[0]).to.have.property('name');
                    expect(res.body[0]).to.have.property('email');
                    expect(res.body[0].email).to.equal('test@gmail.com');
                    expect(res.body[0].name).to.equal('test');
                    expect(res).to.have.status(200);
                    done();
                })
        })
    })

    describe('read One', function () {
        it('should read one data in database without error', function (done) {
            chai.request(app)
                .get(`/users/${userTest._id}`)
                .send()
                .end(function (err, res) {
                    expect(res.body).to.have.be.an('Object');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('status');
                    expect(res.body.email).to.equal('test@gmail.com');
                    expect(res.body.name).to.equal('test');
                    expect(res.body._id).to.equal(userTest._id);
                    expect(res.body.status).to.equal(true);
                    expect(res).to.have.status(200);
                    done();
                })
        })

        it('should read one data in database with error user not', function (done) {
            chai.request(app)
                .get('/users/5dbf982a4153db0c8882c324')
                .send()
                .end(function (err, res) {
                    expect(res.body).to.have.be.an('Object');
                    expect(res.body).to.have.property('id');
                    expect(res.body).to.have.property('message');
                    expect(res.body).to.have.property('status');
                    expect(res.body.message).to.equal('User not found');
                    expect(res.body.id).to.equal('5dbf982a4153db0c8882c324');
                    expect(res.body.status).to.equal(false);
                    expect(res).to.have.status(404);
                    done();
                })
        })
    })

    describe('edit data', function () {
        it('it should edit one data without error', function (done) {
            chai.request(app)
                .patch(`/users/${userTest._id}`)
                .send({
                    name: 'testing',
                    email: 'testing@gmail.com'
                })
                .end(function (err, res) {
                    expect(res.body).to.have.be.an('Object');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('email');
                    expect(res.body._id).to.equal(userTest._id);
                    expect(res.body.name).to.equal('testing');
                    expect(res.body.email).to.equal('testing@gmail.com');
                    expect(res.body.status).to.equal(true);
                    expect(res).to.have.status(200);
                    done();
                })
        })

        it('it should edit one data with error is Invalid', function (done) {
            chai.request(app)
                .patch(`/users/5dbf982a4153db0c8882c324`)
                .send()
                .end(function (err, res) {
                    expect(res.body).to.have.be.an('Object');
                    expect(res.body).to.have.property('message');
                    expect(res.body).to.have.property('status');
                    expect(res.body.message).to.equal('Is Invalid');
                    expect(res.body.status).to.equal(false);
                    expect(res).to.have.status(400);
                    done();
                })
        })

        it('it should edit one data with error is Invalid', function (done) {
            chai.request(app)
                .patch(`/users/5dbf982a4153db0c8882c324`)
                .send({
                    name: 'test',
                    email: 'test@gmail.com'
                })
                .end(function (err, res) {
                    expect(res.body).to.have.be.an('Object');
                    expect(res.body).to.have.property('message');
                    expect(res.body).to.have.property('status');
                    expect(res.body.message).to.equal('User not found');
                    expect(res.body.status).to.equal(false);
                    expect(res).to.have.status(404);
                    done();
                })
        })
    })

    describe('delete data', function () {
        it('it should delete one data without error', function (done) {
            chai.request(app)
                .delete(`/users/${userTest._id}`)
                .send()
                .end(function (err, res) {
                    expect(res.body).to.have.be.an('Object');
                    expect(res.body).to.have.property('_id');
                    expect(res.body).to.have.property('email');
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('status');
                    expect(res.body.name).to.equal('testing');
                    expect(res.body.email).to.equal('testing@gmail.com');
                    expect(res.body._id).to.equal(userTest._id);
                    expect(res.body.status).to.equal(true);
                    expect(res).to.have.status(200);
                    done();
                })
        })

        it('it should delete one data with error user not found', function (done) {
            chai.request(app)
                .delete(`/users/5dbf982a4153db0c8882c324`)
                .send()
                .end(function (err, res) {
                    expect(res.body).to.have.be.an('Object');
                    expect(res.body).to.have.property('id');
                    expect(res.body).to.have.property('message');
                    expect(res.body).to.have.property('status');
                    expect(res.body.message).to.equal('User not found');
                    expect(res.body.id).to.equal('5dbf982a4153db0c8882c324');
                    expect(res.body.status).to.equal(false);
                    expect(res).to.have.status(404);
                    done();
                })
        })
    })

})