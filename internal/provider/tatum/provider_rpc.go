package tatum

import (
	"context"
	"fmt"
	"strings"
	"log"
	"github.com/ethereum/go-ethereum/ethclient"
)

func (p *Provider) EthereumRPC(ctx context.Context, isTest bool) (*ethclient.Client, error) {
	rpcPath := p.rpcPath("v3/blockchain/node/ETH", isTest)
	log.Printf("EthereumRPC: Generated RPC path: %s", rpcPath)
	
	client, err := ethclient.DialContext(ctx, rpcPath)
	if err != nil {
		log.Printf("EthereumRPC: Error creating Ethereum client: %v", err)
		return nil, err
	}
	
	log.Printf("EthereumRPC: Successfully connected to Ethereum RPC at %s", rpcPath)
	return client, nil
}


func (p *Provider) MaticRPC(ctx context.Context, isTest bool) (*ethclient.Client, error) {
	return ethclient.DialContext(ctx, p.rpcPath("v3/blockchain/node/MATIC", isTest))
}

func (p *Provider) BinanceSmartChainRPC(ctx context.Context, isTest bool) (*ethclient.Client, error) {
	return ethclient.DialContext(ctx, p.rpcPath("v3/blockchain/node/BSC", isTest))
}

func (p *Provider) rpcPath(path string, isTest bool) string {
	url := fmt.Sprintf("%s/%s/%s", p.config.BasePath, path, p.config.APIKey)
	if !isTest {
		return url
	}

	url = fmt.Sprintf("%s/%s/%s", p.config.BasePath, path, p.config.TestAPIKey)

	if strings.HasSuffix(path, "ETH") {
		url += "?testnetType=" + EthTestnet
	}

	return url
}
