let
  pkgs = import
    (builtins.fetchTarball {
      name = "nixos-unstable-2021-10-01";
      url = "https://github.com/nixos/nixpkgs/archive/d3d2c44a26b693293e8c79da0c3e3227fc212882.tar.gz";
      sha256 = "0vi4r7sxzfdaxzlhpmdkvkn3fjg533fcwsy3yrcj5fiyqip2p3kl";
    })
    { };

  compile = pkgs.writeShellScriptBin "compile" ''
    forge build
    hardhat compile --force
  '';

  codegen = pkgs.writeShellScriptBin "codegen" ''
    graph codegen
  '';

  docker-up = pkgs.writeShellScriptBin "docker-up" ''
    docker-compose -f docker/docker-compose.yml up --build -d
  '';

  docker-down = pkgs.writeShellScriptBin "docker-down" ''
    docker-compose -f docker/docker-compose.yml down
  '';

  flush-all = pkgs.writeShellScriptBin "flush-all" ''
    rm -rf cache
    rm -rf cache_forge
    rm -rf node_modules
    rm -rf abis
    rm -rf artifacts
    rm -rf build
    rm -rf contracts
    rm -rf generated
    rm -rf typechain
    rm -rf schema
    rm -rf utils
    rm -rf out
    rm -rf foundry.toml
  '';

  ci-test = pkgs.writeShellScriptBin "ci-test" ''
    npx mustache config/localhost.json subgraph.template.yaml subgraph.yaml
    codegen
    npx hardhat test
  '';

  install-submodules = pkgs.writeShellScriptBin "install-submodules" ''
    mkdir -p lib

    git -C lib clone https://github.com/foundry-rs/forge-std.git
    git -C lib clone https://github.com/rainprotocol/rain.cooldown.git
    git -C lib clone https://github.com/rainprotocol/rain.math.saturating.git
    git -C lib clone https://github.com/rainprotocol/sol.lib.binmaskflag.git
    git -C lib clone https://github.com/rainprotocol/sol.lib.datacontract.git
    git -C lib clone https://github.com/rainprotocol/sol.metadata.git

    git -C lib//sol.lib.datacontract checkout 80aaaa8 

    git submodule add https://github.com/foundry-rs/forge-std.git lib/forge-std
    git submodule add https://github.com/rainprotocol/rain.cooldown.git lib/rain.cooldown
    git submodule add https://github.com/rainprotocol/rain.math.saturating.git lib/rain.math.saturating
    git submodule add https://github.com/rainprotocol/sol.lib.binmaskflag.git lib/sol.lib.binmaskflag
    git submodule add https://github.com/rainprotocol/sol.lib.datacontract.git lib/sol.lib.datacontract
    git submodule add https://github.com/rainprotocol/sol.metadata.git lib/sol.metadata
    
    forge install --root lib/forge-std
    forge install --root lib/rain.cooldown
    forge install --root lib/rain.math.saturating
    forge install --root lib/sol.lib.binmaskflag
    forge install --root lib/sol.lib.datacontract
    forge install --root lib/sol.metadata

    forge build --root lib/forge-std
    forge build --root lib/rain.cooldown
    forge build --root lib/rain.math.saturating
    forge build --root lib/sol.lib.binmaskflag
    forge build --root lib/sol.lib.datacontract
    forge build --root lib/sol.metadata
  '';

  copy-abis = pkgs.writeShellScriptBin "copy-abis" ''
    mkdir -p abis
    cp artifacts/contracts/orderbook/OrderBook.sol/OrderBook.json abis
    cp artifacts/contracts/test/testToken/ReserveToken.sol/ReserveToken.json abis
  '';

  init = pkgs.writeShellScriptBin "init" ''
    npm install
    rm -rf docker/data
    mkdir -p contracts && cp -r node_modules/@rainprotocol/rain-protocol/contracts .
    mkdir -p schema && cp -r node_modules/@rainprotocol/rain-protocol/schema .
    mkdir -p utils && cp -r node_modules/@rainprotocol/rain-protocol/utils .
    cp node_modules/@rainprotocol/rain-protocol/foundry.toml .
    mkdir -p contracts/test/orderbook && cp sg_test_contracts/*.sol contracts/test/orderbook/
    install-submodules
    compile
    copy-abis
  '';

  ci-prepare-subgraph = pkgs.writeShellScriptBin "ci-prepare-subgraph" ''
    npx mustache config/polygon.json subgraph.template.yaml subgraph.yaml
  '';
  
in
pkgs.stdenv.mkDerivation {
 name = "shell";
 buildInputs = [
  pkgs.nixpkgs-fmt
  pkgs.yarn
  pkgs.nodejs-16_x
  ci-test
  compile
  codegen
  copy-abis
  docker-up
  docker-down
  flush-all
  init
  install-submodules
 ];

 shellHook = ''
  export PATH=$( npm bin ):$PATH
 '';
}
