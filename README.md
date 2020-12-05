
<!--#echo json="package.json" key="name" underline="=" -->
ubborg-sysd-mountpoint
======================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Easily declare systemd (auto)mountpoints.
<!--/#echo -->



API
---

This module exports one function:

### describeSystemdMountPoint(spec[, bun])

`spec` shoult be either
* a details object (see below),
* a string, which will be interpreted as if it were the `device` property
  of a details object,
* or an array of any of the above.

Returns an array of specs for `admFile` resources.
If `bun` is specified and has a `.needs` method, it's assumed to be an
ubborg bundle, and the `admFile`s are requested on its behalf.
In this case, the resulting promise will be returned instead, and the
specs array will be stored on that promise in the `specs` property.

Details objects support these properties, most of them optional:

* `device` (required): Path to the disk device.
* `mountAt`: Absolute path where to mount the device.
* `fsType`: Explicit file system selection, in case `auto` isn't good enough.
* `fsOpt`: File system options, as string, array or dictionary object.
* `descr`: User-visible (explanatory) description of the mount unit.
* `mountOnDemand`: Boolean, default: `false`.
  If enabled, systemd will mount an autofs onto the mountpoint, which will
  mount the device as soon as someone tries to access the autofs.
  * `idleSec`: After which timespan of idleness systemd should umount the
    device. (The autofs should remain.)
    See systemd docs about `TimeoutIdleSec` for details.
* `mountOnDetect`: Boolean, default: `false`.
  Whether the device shall be mounted as soon as it becomes available.
  * If this is the only reason for mounting it, then the mountpoint should
    be released automatically once the device disappears.
    * NB: This does not imply a proper umount. If any cleanup should have
      been done before the device disappears, you'll need an earlier trigger.
      Once a device has disappeared, the OS can no longer talk to it.
* `wantedBy`: Additional systemd targets to trigger on, that don't have
  their own option here.
  This does not create an `[Install]` section.
  Instead, it declares symlinks in `/etc/systemd/system/${target}.wants/`.
  * If a target name ends with `¬` (U+00AC not sign),
    that character is ignored for naming,
    and the symlink is declared as "shall not exist".
  * The list may be given as a string (space-separated) or array.
    In case of an array, for your tabulating convenience, all whitespace is
    ignored.





Usage
-----

:TODO:


<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
