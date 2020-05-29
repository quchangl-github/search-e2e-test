/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 * Copyright (c) 2020 Red Hat, Inc.
 *******************************************************************************/
var nconf = require('nconf'),
    nconfYaml = require('nconf-yaml'),
    path = require('path')

var configDir = path.resolve(__dirname)

nconf.env({ lowerCase: true, separator: '_' })
    .file({file: './options.yaml', format: nconfYaml })
    .defaults({
        CLUSTER_PORT: '443',
        CLUSTER_VIEWER_USR: 'user-viewer',
        CLUSTER_VIEWER_PWD: 'pass-viewer',
        contextPath: '/multicloud'
    })

nconf.required(['options:hub:baseDomain', 'options:hub:user', 'options:hub:password'])

if (nconf.get('options:hub:baseDomain') === ''
    || nconf.get('options:hub:user') === ''
    || nconf.get('options:hub:password') === '') {
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    console.error('Missing environment variables. The following are required:')
    console.error('  - OPTIONS_HUB_BASEDOMAIN or options.hub.baseDomain in ./options.yaml.')
    console.error('  - OPTIONS_HUB_USER or options.hub.user in ./options.yaml.')
    console.error('  - OPTIONS_HUB_PASSWORD or options.hub.password in ./options.yaml.')
    console.error('Exiting tests...')
    console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n')
    process.exit(1)
  }

console.log('Test environment')
console.log('========================================')
console.log('baseDomain : ', nconf.get('options:hub:baseDomain'))
console.log('user       : ', nconf.get('options:hub:user'))
console.log('password   : ', nconf.get('options:hub:password'))
console.log('========================================\n')

module.exports = nconf
