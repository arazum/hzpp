# hzpp

HŽ train schedule in seconds.

A command-line utility for quick HŽ train schedule listing.

## Installation

```bash
$ npm i -g hzpp
```

If you're upgrading from `1.0.0` to a newer version please uninstall first or delete the old configuration file.

```bash
$ npm rm -g hzpp
```

## Usage

Show the train schedule for configured lines.

```bash
$ hzpp
```

Call the program with any arguments to show help.

## Configuration

### Editing

Edit the `config.json` file located in the module's root folder to configure program options.
To get the configuration file location enter the following command.

```bash
$ hzpp help
```

If anything wrong happens with your configuration you can always reinstall the package (see [Installation](#installation)) or remove the `config.json` file and replace it with `defaultConfig.json`.

### Format

Configuration is done on two levels:

1.	default - applies to all lines. In `defaults` object in the configuration.
2.	per line configuration - applies to given line. In each element of the `lines` array.

Per line configurations override defaults.

Currently supported configuration options:

-	`from` - departure train station (see [Station naming](#station-naming))
-	`to` - arrival train station (see [Station naming](#station-naming)) 
-	`label` - display name to show
-	`limit` - maximum number of trains to show
-	`showArrival` - show arrival times next to departure times in parentheses

#### Station naming

To find out what's the encoded name of your train station go to [HŽ vozni red](http://vred.hzinfra.hr/hzinfo/?category=hzinfo&service=vred3&nkod1=&nkdo1=&lang=hr&screen=4). Enter your station and some arbitrary other station and submit. The `NKOD1` argument in URL is the encoded station name.
